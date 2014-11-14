(function () {
    'use strict';

    var alchemy = require('./../../alchemy');
    var h = virtualDom.h;

    /**
     * @class
     * @name todo.ui.Footer
     */
    alchemy.formula.add({
        name: 'todo.ui.Footer',

        overrides: {
            /** @lends todo.ui.Footer.prototype */

            render: function (state) {
                var todos = state.get('todos');
                var numOfCompleted = todos.reduce(function (num, todo) {
                    return todo.completed ? num + 1 : num;
                }, 0);
                var numOfUnCompleted = todos.length - numOfCompleted;
                var route = state.get('route');

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
                return h('li', null, h('a' + (selected ? '.selected' : ''), {
                    href: filterRoute
                }, text));
            },
        }
    });
}());



