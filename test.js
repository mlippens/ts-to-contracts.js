/**
 * Created by Michael on 4/03/14.
 */
var falafel = require('falafel');

var module = "module 'foo' {}";

var src = falafel(module, function (node) {
    //if (node.name === 'call') node.wrap('qqq(%s)');
});


console.log(src);