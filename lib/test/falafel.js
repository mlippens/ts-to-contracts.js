var falafel = require('falafel');
var program = "(function(e) { return e + e;});";

var output = falafel(program, function(node) {
    if(node.type === "BinaryExpression") {
        node.update("modify(" + node.source() + ")");
    }
});

console.log(output);
//(function(e) { return modify(e + e);});
