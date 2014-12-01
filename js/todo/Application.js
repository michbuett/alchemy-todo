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
            'todo.control.Todo'
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

                var controller = alchemy('todo.control.Todo').brew();
                alchemy.each(controller.messages, function (fnName, message) {
                    this.messages.on(message, function (data) {
                        var fn = controller[fnName];
                        this.state = fn.call(null, this.state, data);
                    }, this);
                }, this);
            },


            update: function (params) {
                var route = window.location.hash || '#/';
                return params.state.set('route', route);
            },

            draw: function (params) {
                this.viewport.draw(params.state);

                this.fpsEl.innerHTML = params.fps;
            }
        }
    });
}());
