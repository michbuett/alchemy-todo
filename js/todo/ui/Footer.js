(function () {
    'use strict';

    var alchemy = require('./../../alchemy');

    /**
     * @class
     * @name todo.ui.Footer
     */
    alchemy.formula.add({
        name: 'todo.ui.Footer',
        extend: 'todo.ui.Prima',

        overrides: {
            /** @lends todo.ui.Footer.prototype */

            selector: '#footer',

            initialState: {
                completed: 0,
                uncompleted: 0,
                route: ''
            },

            updateState: function (appState) {
                this.state = this.state.set({
                    completed: appState.val('completed'),
                    uncompleted: appState.val('uncompleted'),
                    route: appState.sub('route'),
                });
            },

            render: function (state) {
                var h = this.h;
                var numOfCompleted = this.state.sub('completed').val();
                var numOfUnCompleted = this.state.sub('uncompleted').val();
                var route = this.state.sub('route').val();
                var messages = this.messages;

                return h('#footer', null, [
                    h('span#todo-count', null, [
                        h('strong', null, String(numOfUnCompleted)),
                        ' item(s) left'
                    ]),
                    h('ul#filters', [
                        this.createFilter(route, '#/', 'All'),
                        this.createFilter(route, '#/active', 'Active'),
                        this.createFilter(route, '#/completed', 'Completed'),
                    ]),
                    h('button#clear-completed', {
                        onclick: function () {
                            messages.trigger('todo:deleteall');
                        }
                    }, 'Clear completed (' + numOfCompleted + ')')
                ]);
            },

            createFilter: function (currentRoute, filterRoute, text) {
                var selected = (currentRoute === filterRoute);
                var h = this.h;
                return h('li', null, h('a' + (selected ? '.selected' : ''), {
                    href: filterRoute
                }, text));
            },
        }
    });
}());



