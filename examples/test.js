(function() {
    var root, C;
    root = this;
    if (typeof require === 'function') {
        C = require('contracts-js');
    } else {
        C = root['contracts-js'];
    }

    var globals = {};
    var IA = C.object({
        bar: C.fun([], C.Any, {})
    }, {});
    var IB = C.object({
        bar: C.fun([], C.Any, {}),
        foo: C.fun([], C.Any, {})
    }, {});
    //IB implicitly extends interface IA due to Typescript's structural typing

    globals.fn = C.guard(C.fun([C.fun([IA], C.Undefined, {})], C.Any, {}), function(passedFn) {
        var a = C.guard(IA, {
            bar: C.guard(C.fun([], C.Any, {}), function() {}, "main")
        }, "main");
        passedFn(a);
    }, "main")

    //TypeError: b.foo is not a functionfn
    (C.guard(C.fun([IB], C.Any, {}), function(b) {
        b.foo();
    }, "main"));
    return globals;
}).call(this);