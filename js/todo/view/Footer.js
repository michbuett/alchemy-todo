(function () {
    'use strict';

    var alchemy = require('./../../alchemy');

    /**
     * @class
     * @name todo.view.Footer
     */
    alchemy.formula.add({
        name: 'todo.view.Footer',
        extend: 'alchemy.web.Visio',

        overrides: {
            /** @lends todo.view.Footer.prototype */

            selector: '#footer',

            initialState: {
                completed: 0,
                uncompleted: 0,
                route: ''
            },

            events: {
                'click button#clear-completed': 'onClickClearAll',
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
                    h('button#clear-completed', 'Clear completed (' + numOfCompleted + ')')
                ]);
            },

            onClickClearAll: function () {
                this.messages.trigger('todo:deleteall');
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



