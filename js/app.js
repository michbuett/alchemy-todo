(function () {
    'use strict';

    var alchemy = require('alchemy');

    alchemy.heatUp({
        path: {
            'todo': 'js/todo',
            'vd': 'js/vd',
            'alchemy': 'js/alchemy/lib/'
        },

        require: ['todo.Application'],

        onReady: function () {
            window.app = alchemy('todo.Application').brew();
            window.app.launch();
        }
    });
}());
