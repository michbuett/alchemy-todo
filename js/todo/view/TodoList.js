(function () {
    'use strict';

    var alchemy = require('./../../alchemy');

    /**
     * @class
     * @name todo.view.TodoList
     */
    alchemy.formula.add({
        name: 'todo.view.TodoList',
        extend: 'alchemy.web.Visio',

        overrides: {
            /** @lends todo.view.TodoList.prototype */

            selector: '#main',

            render: function () {
                var h = this.h;
                var todos =  this.state.sub('todos').val();
                var hasTodos = this.state.val('all') > 0;
                var allCompleted = this.state.val('uncompleted') === 0;
                var messages = this.messages;

                return h('#main', {
                    className: hasTodos ? '' : 'hidden'
                }, [
                    h('input#toggle-all', {
                        type: 'checkbox',
                        checked: allCompleted,
                        onchange: function (ev) {
                            messages.trigger('todo:updateall', {
                                completed: !allCompleted
                            });
                        }
                    }),
                    h('label', {
                        htmlFor: 'toggle-all'
                    }, 'Mark all as complete'),
                    h('ul#todo-list', null, alchemy.each(todos, this.renderTodo, this))
                ]);
            },

            renderTodo: function (todo, index) {
                var route = this.state.sub('route').val();
                if (route === '#/completed' && !todo.completed) {
                    return;
                }

                if (route === '#/active' && todo.completed) {
                    return;
                }

                var messages = this.messages;
                var cssClass = '';
                var h = this.h;

                if (todo.editing) {
                    cssClass = 'editing';
                }

                if (todo.completed) {
                    cssClass = 'completed';
                }

                return h('li', {
                    key: todo.id,
                    className: cssClass
                }, [
                    h('div.view', null, [
                        h('input.toggle', {
                            type: 'checkbox',
                            checked: todo.completed,
                            onchange: function (ev) {
                                messages.trigger('todo:update', {
                                    index: index,
                                    completed: !todo.completed
                                });
                            },
                        }),
                        h('label', {
                            ondblclick: function (ev) {
                                messages.trigger('todo:update', {
                                    index: index,
                                    editing: true,
                                });
                            }
                        }, todo.text),
                        h('button.destroy', {
                            onclick: function () {
                                messages.trigger('todo:delete', {
                                    index: index
                                });
                            }
                        })
                    ]),
                    h('input.edit', {
                        value: todo.text,
                        onchange: function (ev) {
                            if (todo.completed) {
                                return;
                            }
                            var target = ev && ev.target;
                            if (!target) {
                                return;
                            }
                            messages.trigger('todo:update', {
                                index: index,
                                text: target.value,
                                editing: false,
                            });
                        }
                    })
                ]);
            }
        }
    });
}());


