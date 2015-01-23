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
                var cfg = {
                    messages: this.messages,
                    delegator: this.delegator,
                };

                this.subs = {
                    header: alchemy('todo.view.Header').brew(cfg),
                    todos: alchemy('todo.view.TodoList').brew(cfg),
                    footer: alchemy('todo.view.Footer').brew(cfg),
                };
            },

            render: function (state) {
                return this.h('section#todoapp', null, this.renderSubs());
            }
        }
    });
}());

