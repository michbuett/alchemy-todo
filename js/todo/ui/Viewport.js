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
                    header: alchemy('todo.ui.Header').brew({
                        messages: this.messages
                    }),
                    todos: alchemy('todo.ui.TodoList').brew({
                        messages: this.messages
                    }),
                    footer: alchemy('todo.ui.Footer').brew({
                        messages: this.messages
                    }),
                };
            },

            render: function (state) {
                return this.h('section#todoapp', null, this.renderSubs());
            }
        }
    });
}());

