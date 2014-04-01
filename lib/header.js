(function() {
    var root, C;
    root = this;
    if (typeof require === 'function') {
        C = require('contracts-js');
    } else {
        C = root['contracts-js'];
    }

    var globals = {};
