(function() {
    var root, C;
    root = this;
    if (typeof require === 'function') {
        C = require('contracts-js');
    } else {
        C = root['contracts-js'];
    }

    var globals = {};
    var Foo = C.and(C.object({
        foo: C.Str
    }, {}), C.fun({
        "call": [C.Str, C.Any],
        "new": [, C.Undefined]
    }));
    return globals;
}).call(this);