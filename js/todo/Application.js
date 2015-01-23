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
            'alchemy.web.Delegatus',
            'todo.modell.State',
            'todo.view.Viewport',
            'todo.controller.Todo',
            'todo.controller.Storage',
        ],

        overrides: {
            /** @lends todo.Application.prototype */

            init: function () {
                this.delegator = alchemy('alchemy.web.Delegatus').brew();
                this.state = alchemy('todo.modell.State').createAppState();
                this.storage = alchemy('todo.controller.Storage').brew();
                this.viewport = alchemy('todo.view.Viewport').brew({
                    delegator: this.delegator,
                    messages: this.messages,
                    root: document.getElementById('todoapp'),
                });

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
                alchemy.each(['delegator', 'viewport', 'storage'], function (prop) {
                    this[prop].dispose();
                    this[prop] = null;
                }, this);
            },
        }
    });
}());
