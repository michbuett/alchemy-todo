(function () {
    'use strict';

    var alchemy = require('./../alchemy');

    /**
     * @class
     * @name todo.control.Todo
     */
    alchemy.formula.add({
        name: 'todo.control.Todo',

        overrides: {
            /** @lends todo.control.Todo.prototype */

            messages: {
                'todo:create': 'createTodo',
                'todo:delete': 'deleteTodo',
                'todo:update': 'updateTodo',
            },

            updateTodo: function (state, data) {
                console.log('[createTodo] Implement Me!', state, data);
            },

            deleteTodo: function (state, data) {
                console.log('[createTodo] Implement Me!', state, data);
            },

            createTodo: function (state, data) {
                var todos = [].concat(state.get('todos'));
                todos.push({
                    id: alchemy.id(),
                    completed: false,
                    editing: false,
                    text: data.text
                });

                return state.set('todos', todos);
            },
        }
    });
}());

