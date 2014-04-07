(function() {
    var root, C;
    root = this;
    if (typeof require === 'function') {
        C = require('contracts-js');
    } else {
        C = root['contracts-js'];
    }

    var globals = {};
    var Foo = C.and(C.object({}, {}), C.fun({
        "call": [
            [], C.Undefined
        ],
        "new": [
            [C.Str], C.Any
        ]
    }));

    var f = C.guard(Foo, C.guard(C.fun([], C.Any, {}), function() {}, "main"), "main");
    new f();
    return globals;
}).call(this);