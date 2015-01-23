(function () {
    'use strict';

    var alchemy = require('./../../alchemy');
    var KEY_ENTER = 13;

    /**
     * @class
     * @name todo.view.Header
     */
    alchemy.formula.add({
        name: 'todo.view.Header',
        extend: 'alchemy.web.Visio',

        overrides: {
            /** @lends todo.view.Todo.Header */

            selector: '#header',

            events: {
                'keypress #new-todo': 'handleNewTodo',
            },

            render: function (state) {
                var h = this.h;

                return h('header#header', null, [
                    h('h1', null, 'todos'),
                    h('input#new-todo', {
                        placeholder: 'What needs to be done?',
                        autofocus: true,
                    }, '')
                ]);
            },

            handleNewTodo: function (ev) {
                var text = ev.target && ev.target.value;
                if (text && ev.keyCode === KEY_ENTER) {
                    this.messages.trigger('todo:create', {
                        text: text
                    });
                    ev.target.value = '';
                }
            },
        }
    });
}());



