define(["require", "exports", "contracts-js"], function(require, exports) {
    var C = require("contracts-js");
    var Fun, Arr, RegExp, Foo;
    /**
     * Created by mello on 5/8/14.
     */
    window.Foo = C.guard(C.object({
        bar: C.fun([C.Bool], C.Any, {})
    }, {
        "class": C.object({
            foo: C.fun([C.Str, C.Num], C.Undefined, {})
        }, {}, "Foo")
    }), window.Foo);
    return exports;
});