(function () {
    'use strict';

    var alchemy = require('./../alchemy');
    var diff = virtualDom.diff;
    var patch = virtualDom.patch;
    var h = virtualDom.h;

    /**
     * @class
     * @name todo.Application
     * @extends alchemy.web.Applicatus
     */
    alchemy.formula.add({
        name: 'todo.Application',
        extend: 'alchemy.web.Applicatus',

        requires: [
            'todo.ui.Viewport'
        ],

        overrides: {
            /** @lends todo.Application.prototype */

            onLaunch: function () {
                this.state = alchemy('Immutatio').brew({
                    route: '#/',
                    todos: [{
                        id: 'foo',
                        text: 'Foo Foo Foo',
                        editing: false,
                        completed: false
                    }, {
                        id: 'bar',
                        text: 'Bar Bar Bar',
                        editing: false,
                        completed: false
                    }]
                });

                this.viewport = alchemy('todo.ui.Viewport').brew({
                    root: document.getElementById('todoapp')
                });

                this.fpsEl = document.getElementById('fps');
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
