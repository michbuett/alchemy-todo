(function () {
    'use strict';

    var alchemy = require('./../../alchemy');

    /**
     * @class
     * @name todo.ui.TodoList
     */
    alchemy.formula.add({
        name: 'todo.ui.TodoList',
        extend: 'todo.ui.Prima',

        requires: [
            'todo.ui.Todo'
        ],

        overrides: {
            /** @lends todo.ui.TodoList.prototype */

            selector: '#main',

            updateState: function (appState) {
                return this.state.set('todos', appState.get('todos'));
            },

            render: function () {
                var h = this.h;
                var todos =  this.state.get('todos');

                return h('#main', null, [
                    h('input#toggle-all', {type: 'checkbox'}),
                    h('label', {htmlFor: 'toggle-all'}, 'Mark all as complete'),
                    h('ul#todo-list', null, alchemy.each(todos, this.renderTodo, this))
                ]);
            },

            renderTodo: function (todo) {
                var cssClass = '';
                var h = this.h;

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


