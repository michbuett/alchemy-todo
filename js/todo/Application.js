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
            'todo.modell.State',
            'todo.view.Viewport',
            'todo.controller.Todo',
            'todo.controller.Storage',
        ],

        overrides: {
            /** @lends todo.Application.prototype */

            init: function () {
                this.state = alchemy('todo.modell.State').createAppState();

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
            },

            finish: function () {
                this.viewport.dispose();
                this.viewport = null;

                this.storage.dispose();
                this.storage = null;
            },
        }
    });
}());
