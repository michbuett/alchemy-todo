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
                    state: this.state
                });

                this.tree = h();
                this.rootNode = document.getElementById('todoapp');
            },


            update: function (params) {
                var route = window.location.hash || '#/';
                return params.state.set('route', route);
            },

            draw: function (params) {
                var newTree = this.viewport.render(params.state);
                if (!newTree) {
                    return;
                }

                var patches = this.tree ? diff(this.tree, newTree) : newTree;
                this.rootNode = patch(this.rootNode, patches);
                this.tree = newTree;
            }
        }
    });
}());
