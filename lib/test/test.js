var foo;
(function (foo) {
    function double(x) {
        return x * x;
    }
    foo.double = double;
    ;
})(foo || (foo = {}));

module.exports = foo;
//# sourceMappingURL=test.js.map
