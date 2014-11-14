(function () {
    'use strict';

    var alchemy = require('alchemy');

    alchemy.heatUp({
        path: {
            'todo': 'js/todo',
            'alchemy': 'js/alchemy/lib/'
        },

        require: ['todo.Application'],

        onReady: function () {
            window.app = alchemy('todo.Application').brew();
            window.app.launch();
        }
    });
}());
