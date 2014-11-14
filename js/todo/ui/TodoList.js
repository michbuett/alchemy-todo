(function () {
    'use strict';

    var alchemy = require('./../../alchemy');
    var h = virtualDom.h;

    /**
     * @class
     * @name todo.ui.TodoList
     */
    alchemy.formula.add({
        name: 'todo.ui.TodoList',

        requires: [
            'todo.ui.Todo'
        ],

        overrides: {
            /** @lends todo.ui.TodoList.prototype */

            render: function (todos) {
                return h('#main', null, [
                    h('input#toggle-all', {type: 'checkbox'}),
                    h('label', {htmlFor: 'toggle-all'}, 'Mark all as complete'),
                    h('ul#todo-list', null, this.renderTodos(todos))
                ]);
            },

            renderTodos: function (todos) {
                var result = [];
                for (var i = 0; i < todos.length; i++) {
                    result.push(this.renderTodo(todos[i]));
                }
                return result;
            },

            renderTodo: function (todo) {
                var cssClass = '';

                if (todo.completed) {
                    cssClass += '.completed';
                }

                if (todo.editing) {
                    cssClass += '.editing';
                }

                var attr = {
                    type: 'checkbox'
                };

                if (todo.checked) {
                    attr.checked = true;
                }

                return h('li' + cssClass, null, [
                    h('div.view', null, [
                        h('input.toggle', attr),
                        h('label', null, todo.text),
                        h('button.destroy')
                    ]),
                    h('input.edit', {value: todo.text})
                ]);
            }
        }
    });
}());


