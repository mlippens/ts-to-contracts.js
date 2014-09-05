define(["require", "exports", "contracts-js", "chai"], function(require, exports) {
    var C = require("contracts-js");
    var Fun, Arr, RegExp, chai, _chai, expect, use, ExpectStatic, Assertions, LanguageChains, NumericComparison, NumberComparer, TypeComparison, Expect, InstanceOf, Deep, Equal, Property, OwnProperty, Length, Include, Keys, Members, Throw, __chai;
    chai = require("chai"); // Type definitions for chai 1.7.2
    // Project: http://chaijs.com/
    // Definitions by: Jed Hunsaker <https://github.com/jedhunsaker/>
    // DefinitelyTyped: https://github.com/borisyankov/DefinitelyTyped
    var Dummies = ["Deep", "TypeComparison", "Include", "Equal", "Property", "OwnProperty", "Length",
        "Throw", "Members", "LanguageChains", "NumericComparison", "Assertions"];
    var Dummy = check(function() {return true}, "Dummy");
    Deep = Dummy;
    TypeComparison = Dummy;
    Include = Dummy;
    Equal = Dummy;
    Property = Dummy;
    OwnProperty = Dummy;
    Length = Dummy;
    Throw = Dummy;
    Members = Dummy;
    LanguageChains = Dummy;
    NumericComparison = Dummy;
    NumberComparer = Dummy;
    Assertions = Dummy;

    Expect = C.extend(C.extend(C.extend(C.extend(C.object({
        not: C.Self,
        deep: Deep,
        a: TypeComparison,
        an: TypeComparison,
        include: Include,
        contain: Include,
        ok: C.Self,
        true: C.Self,
        false: C.Self,
        null: C.Self,
        undefined: C.Self,
        exist: C.Self,
        empty: C.Self,
        arguments: C.Self,
        Arguments: C.Self,
        equal: Equal,
        equals: Equal,
        eq: Equal,
        eql: Equal,
        eqls: Equal,
        property: Property,
        ownProperty: OwnProperty,
        haveOwnProperty: OwnProperty,
        length: Length,
        lengthOf: Length,
        match: C.fun([C.RegExp, C.opt(C.Str)], C.Self, {}),
        string: C.fun([C.Str, C.opt(C.Str)], C.Self, {}),
        keys: Keys,
        key: C.fun([C.Str], C.Self, {}),
        throw :Throw,
        throws: Throw,
        Throw: Throw,
        respondTo: C.fun([C.Str, C.opt(C.Str)], C.Self, {}),
        itself: C.Self,
        satisfy: C.fun([C.Fun, C.opt(C.Str)], C.Self, {}),
        closeTo: C.fun([C.Num, C.Num, C.opt(C.Str)], C.Self, {}),
        members: Members
    }, {}, "Expect"), LanguageChains), NumericComparison), TypeComparison), Assertions);

    Keys = C.and(C.overload_fun(C.fun([], Expect, {
        "rest": C.Str
    }), C.fun([C.Arr(C.Any)], Expect, {})), C.object({}, {}, "Keys"));

    Include = C.and(C.overload_fun(C.fun([C.object({}, {}, "Object"), C.opt(C.Str)], Expect, {}), C.fun([C.Str, C.opt(C.Str)], Expect, {}), C.fun([C.Num, C.opt(C.Str)], Expect, {})), C.object({
        keys: Keys,
        members: Members
    }, {}, "Include"));

    InstanceOf = C.and(C.fun([C.object({}, {}, "Object"), C.opt(C.Str)], Expect, {}), C.object({}, {}, "InstanceOf"));
    Deep = C.object({
        equal: Equal,
        property: Property
    }, {}, "Deep");
    Equal = C.and(C.fun([C.Any, C.opt(C.Str)], Expect, {}), C.object({}, {}, "Equal"));
    Property = C.and(C.fun([C.Str, C.opt(C.Any), C.opt(C.Str)], Expect, {}), C.object({}, {}, "Property"));
    OwnProperty = C.and(C.fun([C.Str, C.opt(C.Str)], Expect, {}), C.object({}, {}, "OwnProperty"));

    ExpectStatic = C.and(C.fun([C.Any], Expect, {}), C.object({}, {}, "ExpectStatic"));
    Assertions = C.object({
        attr: C.fun([C.opt(C.Any)], C.Any, {}),
        css: C.fun([C.opt(C.Any)], C.Any, {}),
        data: C.fun([C.opt(C.Any)], C.Any, {}),
        class: C.fun([], C.Any, {}),
        id: C.fun([], C.Any, {}),
        html: C.fun([], C.Any, {}),
        text: C.fun([], C.Any, {}),
        value: C.fun([], C.Any, {})
    }, {}, "Assertions");
    LanguageChains = C.object({
        to: Expect,
        be: Expect,
        been: Expect,
        is: Expect,
        that: Expect,
        and: Expect,
        have: Expect,
        with: Expect,
        at: Expect,
        of: Expect,
        same: Expect
    }, {}, "LanguageChains");
    NumericComparison = C.object({
        above: NumberComparer,
        gt: NumberComparer,
        greaterThan: NumberComparer,
        least: NumberComparer,
        gte: NumberComparer,
        below: NumberComparer,
        lt: NumberComparer,
        lessThan: NumberComparer,
        most: NumberComparer,
        lte: NumberComparer,
        within: C.fun([C.Num, C.Num, C.opt(C.Str)], Expect, {})
    }, {}, "NumericComparison");
    NumberComparer = C.and(C.fun([C.Num, C.opt(C.Str)], Expect, {}), C.object({}, {}, "NumberComparer"));
    TypeComparison = C.and(C.fun([C.Str, C.opt(C.Str)], Expect, {}), C.object({
        instanceof: InstanceOf,
        instanceOf: InstanceOf
    }, {}, "TypeComparison"));


    Length = C.extend(C.extend(C.and(C.fun([C.Num, C.opt(C.Str)], Expect, {}), C.object({}, {}, "Length")), LanguageChains), NumericComparison);




    Members = C.and(C.fun([C.Arr(C.Any), C.opt(C.Str)], Expect, {}), C.object({}, {}, "Members"));
    Throw = C.and(C.overload_fun(C.fun([], Expect, {}), C.fun([C.Str, C.opt(C.Str)], Expect, {}), C.fun([C.RegExp, C.opt(C.Str)], Expect, {}), C.fun([C.Any, C.opt(C.Str), C.opt(C.Str)], Expect, {}), C.fun([C.Any, C.opt(C.RegExp), C.opt(C.Str)], Expect, {}), C.fun([C.Fun, C.opt(C.Str), C.opt(C.Str)], Expect, {}), C.fun([C.Fun, C.opt(C.RegExp), C.opt(C.Str)], Expect, {})), C.object({}, {}, "Throw"));
    __chai = C.object({
        expect: C.fun([C.Any, C.opt(C.Str)], Expect, {}),
        use: C.fun([C.fun([C.Any, C.Any], C.Undefined, {})], C.Any, {})
    }, {
        "forgiving": true
    }, "chai");

    exports = C.guard(__chai, chai, "chai");
    C.setExported(exports, 'chai');
    return exports;
});