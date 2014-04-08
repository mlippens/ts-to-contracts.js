require('harmony-reflect');

var arr = Proxy([1,2], {});
console.log([].concat([1,2]));
console.log([].concat(arr));
