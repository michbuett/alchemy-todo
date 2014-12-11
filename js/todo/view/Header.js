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

            render: function (state) {
                var h = this.h;
                var messages = this.messages;

                return h('header#header', null, [
                    h('h1', null, 'todos'),
                    h('input#new-todo', {
                        placeholder: 'What needs to be done?',
                        autofocus: true,
                        onkeypress: function (ev) {
                            var text = ev.target && ev.target.value;
                            if (text && ev.keyCode === KEY_ENTER) {
                                messages.trigger('todo:create', {
                                    text: text
                                });
                                ev.target.value = '';
                            }
                        }
                    }, '')
                ]);
            }
        }
    });
}());



