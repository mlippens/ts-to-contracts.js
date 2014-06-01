/**
 * Created by mello on 5/7/14.
 *
 * This file just gives us back a representation of the nesting in the file
 * (so i.e. with respect to modules.)
 * This is needed because of the fact that falafel always treats it's children first.
 * that way we have no idea of knowing where we are.
 */
var parse = require('esprima').parse;


var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

exports.walk = function(src){
    var result = {};
    var ast = parse(src, {"range": true});
    walk(ast, result);

    function walkModule(ast, dict) {
        for (var i = 0; i < ast.body.length; i ++ ){
            var item = ast.body[i];
            if (item.type === "ModuleMember") {
                item = item.typeDeclaration;
                if (item.type === "ClassDeclaration") {
                    dict.push(item.id.name);
                } else if (item.type === "InterfaceDeclaration") {
                    dict.push(item.name.name);
                } else if (item.type === "ModuleDeclaration") {
                    //nested modules (!)
                }
            }
        }
    }


    function walk(ast, dict) {
        var newscope, node, externalname, internalname, name;

        for (var i = 0; i < ast.body.length; i ++ ) {
            node = ast.body[i];
            if (node.type === "ModuleDeclaration") {
                newscope = [];
                externalname = node.id.value;
                internalname = node.id.name;
                name = typeof externalname === 'undefined' ? internalname : externalname;
                if (typeof dict[name] !== "undefined") {
                    walkModule(node, dict[name]);
                } else {
                    dict[name] = newscope;
                    walkModule(node, newscope);
                }
            }
            else if (node.type === "ClassDeclaration") {
                if (Array.isArray(dict)) {
                    dict.push(node.id.name);
                } else {
                    dict[node.id.name] = "class";
                }
            }
            else if (node.type === "InterfaceDeclaration") {
                if (Array.isArray(dict)) {
                    dict.push(node.name.name);
                } else {
                    dict[node.name.name] = "interface";
                }
            }
        }
    }

    return result;
};