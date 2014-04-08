require(["contracts-js"], function(__contracts) {

/*    Q = contracts.use(Q, "Test Suite");
    for (var prop in Q) {
        var val = Q[prop];
        Object.defineProperty(this,prop,{value: val});
    }*/

    var f;
    f = __contracts.guard(__contracts.arr([__contracts.Num]),[2]);
    console.log(Array.isArray(f));
    console.log([].concat(f));
    console.log([].concat(["hi"]));
    //f[0];



/*    f = __contracts.guard(__contracts.object({0: __contracts.Str}, {}), [1]);
    f[0];*/

});

