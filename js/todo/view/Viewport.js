(function () {
    'use strict';

    var alchemy = require('./../../alchemy');

    /**
     * @class
     * @name todo.view.Viewport
     */
    alchemy.formula.add({
        name: 'todo.view.Viewport',
        extend: 'alchemy.web.Visio',

        requires: [
            'todo.view.Header',
            'todo.view.TodoList',
            'todo.view.Footer',
        ],

        overrides: {
            /** @lends todo.view.Viewport.prototype */

            init: function () {
                this.subs = {
                    header: alchemy('todo.view.Header').brew({
                        messages: this.messages
                    }),
                    todos: alchemy('todo.view.TodoList').brew({
                        messages: this.messages
                    }),
                    footer: alchemy('todo.view.Footer').brew({
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

