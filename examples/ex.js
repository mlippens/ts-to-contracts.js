define(["require", "exports", "contracts-js"], function(require, exports) {
    var C = require("contracts-js");
    var Fun, Arr, RegExp, foo, Bar, Foo, _Foo, Foobar, Bar_class, Foo_class;
    Fun = check(function(e) {
        return typeof e === 'function'
    }, "Function");
    RegExp = check(function(e) {
        return e instanceof RegExp
    }, "RegExp");
    var Arr = function(c) {
        return new Contract("Array<" + c.toString() + ">", "array",
            function(val, pos, neg, parents) {
                var parentKs = parents.slice(0);
                var that = this;
                parentKs.push(that);
                //check if array
                if (!Array.isArray(val)) {
                    blameM(pos, neg, "Value is not an array", parentKs);
                }
                //check if homogeneous
                for (var i = 0; i < val.length; i++) {
                    c.check(val[i], pos, neg, parentKs);
                }
                return val;
            });
    };
    Bar = C.object({
        foo: C.fun([Arr(number)], Arr(any), {})
    }, {});
    Bar_class = C.and(C.overload_fun(C.fun([C.Str], C.Any, {}), C.fun([C.Num], C.Any, {})), C.object({}, {
        "class": Bar
    }));
    Foo = C.extend(C.object({}, {}), Bar);
    Foo_class = C.object({}, {
        "class": Foo
    });

    _Foo = C.and(C.overload_fun(C.fun([], C.Any, {}), C.fun([C.Str], C.Num, {})), C.object({}, {}));

    Foobar = C.and(C.overload_fun(C.fun([C.Str], C.Any, {}), C.fun([C.Num], C.Any, {})), C.object({}, {}));
    return exports;
});