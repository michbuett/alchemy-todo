(function () {
    'use strict';

    var alchemy = require('./../Alchemy.js');

    /**
     * Description
     *
     * @class
     * @name todo.modell.State
     * @extends alchemy.core.MateriaPrima
     */
    alchemy.formula.add({
        name: 'todo.modell.State',

        requires: [
            'alchemy.core.Immutatio',
        ],

        overrides: {
            /** @lends todo.modell.State.prototype */

            createAppState: function () {
                return alchemy('Immutatio').makeImmutable({
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
            },
        },
    });
}());
