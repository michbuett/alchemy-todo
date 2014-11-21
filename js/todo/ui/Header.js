(function () {
    'use strict';

    var alchemy = require('./../../alchemy');

    /**
     * @class
     * @name todo.ui.Header
     */
    alchemy.formula.add({
        name: 'todo.ui.Header',
        extend: 'todo.ui.Prima',

        overrides: {
            /** @lends todo.ui.Todo.Header */

            render: function (state) {
                var h = this.h;
                return h('header#header', null, [
                    h('h1', null, 'todos'),
                    h('input#new-todo', {
                        placeholder: 'What needs to be done?',
                        autofocus: true
                    }, '')
                ]);
            }
        }
    });
}());



