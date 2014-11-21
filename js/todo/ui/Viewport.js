(function () {
    'use strict';

    var alchemy = require('./../../alchemy');

    /**
     * @class
     * @name todo.ui.Viewport
     */
    alchemy.formula.add({
        name: 'todo.ui.Viewport',
        extend: 'todo.ui.Prima',

        requires: [
            'todo.ui.Header',
            'todo.ui.TodoList',
            'todo.ui.Footer',
        ],

        overrides: {
            /** @lends todo.ui.Viewport.prototype */

            init: function () {
                this.subs = {
                    header: alchemy('todo.ui.Header').brew(),
                    todos: alchemy('todo.ui.TodoList').brew(),
                    footer: alchemy('todo.ui.Footer').brew(),
                };
            },

            render: function (state) {
                return this.h('section#todoapp', null, this.renderSubs());
            }
        }
    });
}());

