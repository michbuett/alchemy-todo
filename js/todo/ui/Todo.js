(function () {
    'use strict';

    var alchemy = require('./../../alchemy');

    /**
     * @class
     * @name todo.ui.Todo
     */
    alchemy.formula.add({
        name: 'todo.ui.Todo',

        overrides: {
            /** @lends todo.ui.Todo.prototype */

            render: function (state) {
            }
        }
    });
}());


