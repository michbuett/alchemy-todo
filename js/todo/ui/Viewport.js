(function () {
    'use strict';

    var alchemy = require('./../../alchemy');
    var h = virtualDom.h;

    /**
     * @class
     * @name todo.ui.Viewport
     */
    alchemy.formula.add({
        name: 'todo.ui.Viewport',

        requires: [
            'todo.ui.Header',
            'todo.ui.TodoList',
            'todo.ui.Footer',
        ],

        overrides: {
            /** @lends todo.ui.Viewport.prototype */

            init: function () {
                this.header = alchemy('todo.ui.Header').brew();
                this.todos = alchemy('todo.ui.TodoList').brew();
                this.footer = alchemy('todo.ui.Footer').brew();
            },

            render: function (state) {
                return h('section#todoapp', null, [
                    this.header.render(),
                    this.todos.render(state.get('todos')),
                    this.footer.render(state)
                ]);
            }
        }
    });
}());

