define(["require", "exports", "contracts-js"], function(require, exports) {
    var C = require("contracts-js");
    var A, B, C;
    A = C.object({
        a: B
    }, {});

    B = C.object({
        a: C
    }, {});

    C = C.object({
        startAngle: C.and(C.fun([C.fun([], C.Num, {})], C.Undefined, {}), C.object({}, {}))
    }, {});
    return exports;
});