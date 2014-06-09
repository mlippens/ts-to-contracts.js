Fun = check(function(e){ return typeof e === 'function'}, "Function");
Arr = check(function(e){ return Array.isArray(e); }, "Array");
RegExp = check(function(e){ return e instanceof RegExp}, "RegExp");
