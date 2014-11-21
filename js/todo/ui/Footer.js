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

            updateState: function (appState) {
                var todos = appState.get('todos');
                var numOfCompleted = todos.reduce(function (num, todo) {
                    return todo.completed ? num + 1 : num;
                }, 0);
                var numOfUnCompleted = todos.length - numOfCompleted;

                this.state = this.state.set({
                    completed: numOfCompleted,
                    uncompleted: numOfUnCompleted,
                    route: appState.get('route'),
                });
            },

            render: function (state) {
                var h = this.h;
                var numOfCompleted = this.state.get('completed');
                var numOfUnCompleted = this.state.get('uncompleted');
                var route = this.state.get('route');

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
                    h('button#clear-completed', null, 'Clear completed (' + numOfCompleted + ')')
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



