/**
 * Created by Michael on 4/03/14.
 */
var falafel = require('falafel');

var module = "module 'foo' {ho: string \r\n hi: boolean \r\n foo: number}";

var src = falafel(module, function (node) {
    if(node.type === "ModuleDeclaration"){
        node.update("var "+ node.id.value + " = C.object(" + node.body.source() + ", {})");
    }
    if(node.type === "Identifier" && node.name === "string"){
        node.update("C.Str");
    }
    if(node.type === "Identifier" && node.name === "number"){
        node.update("C.Num");
    }
    if(node.type === "Identifier" && node.name === "boolean"){
        node.update("C.Bool");
    }
});


console.log(src);