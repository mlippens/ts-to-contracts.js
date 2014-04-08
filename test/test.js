require(["contracts-js"], function(contracts) {
    contracts.autoload();

/*    Q = contracts.use(Q, "Test Suite");
    for (var prop in Q) {
        var val = Q[prop];
        Object.defineProperty(this,prop,{value: val});
    }*/

    var f;
    f = guard(arr([___(Str)]),[1,2,3,4]);
    console.log(f);

});

