if (typeof Array.prototype.findIndex === 'undefined') {
    Array.prototype.findIndex = function (predicate, thisValue) {
        var arr = Object(this);
        if (typeof predicate !== 'function') {
            throw new TypeError();
        }
        for(var i = 0; i < arr.length; i++) {
            if (i in arr) {
                var elem = arr[i];
                if (predicate.call(thisValue, elem, i, arr)) {
                    return i;
                }
            }
        }
        return -1;
    };
}



var keys = ["foo","bar", "foo", "bee", "boo","foo","bar"];

var indexedKeys = [];

keys.map(function(e, i, arr) {
    var idx, before;
    indexedKeys[i] = i;
    before = arr.slice(0).splice(0, i);
    idx = before.findIndex(function(el){
        return el === e;
    });
    if (idx !== -1) {
        indexedKeys[i] = idx;
    }
});

indexedKeys.map(function(e, i){

}),

console.log(keys);
console.log(indexedKeys);