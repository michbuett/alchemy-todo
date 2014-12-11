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
            'todo.ui.Viewport',

            'todo.control.Todo',
            'todo.control.Storage',
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

                this.viewport = alchemy('todo.ui.Viewport').brew({
                    messages: this.messages,
                    root: document.getElementById('todoapp'),
                });

                this.fpsEl = document.getElementById('fps');
                this.storage = alchemy('todo.control.Storage').brew();

                alchemy.each([this.storage, alchemy('todo.control.Todo').brew()], this.wireMessages, this);
            },

            wireMessages: function (controller) {
                if (!controller || !controller.messages) {
                    return;
                }

                alchemy.each(controller.messages, function (fnName, message) {
                    this.messages.on(message, function (data) {
                        var fn = controller[fnName];
                        this.state = fn.call(controller, this.state, data);
                    }, this);
                }, this);
            },

            update: function (params) {
                var route = window.location.hash || '#/';
                var state = params.state.set('route', route);

                this.storage.update(state);

                return state;
            },

            draw: function (params) {
                this.viewport.draw(params.state);

                this.fpsEl.innerHTML = 'FPS: ' + params.fps;
            }
        }
    });
}());
