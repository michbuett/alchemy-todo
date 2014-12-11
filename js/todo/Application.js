(function () {
    'use strict';

    var alchemy = require('./../alchemy');

    /**
     * @class
     * @name todo.Application
     * @extends alchemy.web.Applicatus
     */
    alchemy.formula.add({
        name: 'todo.Application',
        extend: 'alchemy.web.Applicatus',

        requires: [
            'todo.view.Viewport',
            'todo.controller.Todo',
            'todo.controller.Storage',
        ],

        overrides: {
            /** @lends todo.Application.prototype */

            onLaunch: function () {
                this.state = alchemy('Immutatio').makeImmutable({
                    route: '#/',
                    todos: []
                }, {
                    all: function () {
                        return this.val('todos').length;
                    },

                    completed: function (val) {
                        var completed = 0;
                        for (var i = 0, l = val.todos.length; i < l; i++) {
                            if (val.todos[i].completed) {
                                completed++;
                            }
                        }
                        return completed;
                    },

                    uncompleted: function () {
                        return this.val('all') - this.val('completed');
                    }
                });

                this.viewport = alchemy('todo.view.Viewport').brew({
                    messages: this.messages,
                    root: document.getElementById('todoapp'),
                });

                this.storage = alchemy('todo.controller.Storage').brew();

                alchemy.each([this.storage, alchemy('todo.controller.Todo').brew()], this.wireUp, this);
            },

            update: function (params) {
                var route = window.location.hash || '#/';
                var state = params.state.set('route', route);

                this.storage.update(state);

                return state;
            },

            draw: function (params) {
                this.viewport.draw(params.state);
            }
        }
    });
}());
