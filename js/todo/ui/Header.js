(function () {
    'use strict';

    var alchemy = require('./../../alchemy');
    var h = virtualDom.h;

    /**
     * @class
     * @name todo.ui.Header
     */
    alchemy.formula.add({
        name: 'todo.ui.Header',

        overrides: {
            /** @lends todo.ui.Todo.Header */

            render: function (state) {
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



