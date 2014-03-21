/**
 * Created by Michael on 4/03/14.
 */
var falafel = require('falafel');

var Utils;

Utils = (function (Utils) {

    var prefix = "C.";

    var convertToDefault = function (id, opt) {
        var res;
        switch(id){
            case 'string':
                res = prefix + "Str";
                break;
            case 'number':
                res = prefix + "Num";
                break;
            case 'boolean':
                res = prefix + "Bool";
                break;
            case 'any':
                res = prefix + "Any";
                break;
            case 'void':
                res = prefix + "Any";
                break;
            default:
                res = id;
        }
        if (typeof opt !== 'undefined' && opt) {
            return optional(res);
        }
        return res;
    }

    var returnAnyType = function() {
        return prefix + "Any";
    }

    var prefixIt = function(fn) {
        return function() {
            return prefix + fn.apply(this,arguments);
        }
    }

    var guard = prefixIt(function(contract, guarded) {
        return "guard("+ contract + ", "+ guarded + ")";
    });

    var fun = prefixIt(function(dom,codom) {
        return "fun("+ toArrayString(dom) + "," + codom + ", {})";
    });

    var object = function (name, keys, vals) {
        var i;
        var res = [];
        for (i = 0; i < keys.length; i++) {
            var k = keys[i];
            var v = vals[i];
            res.push(k.name + ":" + v);
        }
        return "var " + name + " = " + prefix + "object({" + res.join(",") + "}, {});";
    };

    var optional = prefixIt(function(str) {
        return "opt(" + str + ")";
    });

    var toArrayString = function(str) {
        return "[" + str + "]";
    }


    var wrapFunction = function(dom, codom, node, name) {
        var prefix = "";
        if (typeof name !== 'undefined') {
            node.id.update('');
            prefix = "var " + name + " = ";
        }
        return prefix + guard(fun(dom,codom), node.source());
    }

    var higherorderParams = function(type){
        //we have a function contract anyway! Any->Any worst case
        var i, param, types, returnType, declaration;
        types = [];
        for (i = 0;i < type.expression.params.length; i++) {
            param = type.expression.params[i];
            declaration = param.typeDeclaration;
            if (typeof declaration !== 'undefined' && declaration.type === 'TypeDeclaration') {
                types.push(convertToDefault(declaration.name, declaration.optional));
            }
            else if (typeof declaration !== 'undefined' && param.typeDeclaration.type === 'FunctionTypeDeclaration') {
                types.push(higherorderParams(param.typeDeclaration));
            }
            else {
                types.push(returnAnyType());
            }
        }

        if (typeof type.returnType !== 'undefined') {
            //can never be optional!
            returnType = convertToDefault(type.returnType.name);
        } else {
          returnType = returnAnyType();
        }
        if (types.length === 0) {
            types = [returnAnyType()];
        }
        if (typeof type.optional !== 'undefined' && type.optional) {
          return optional(fun(types, returnType));
        }

        return fun(types, returnType);
    }

    var processParams = function(node){
        var types, type, param, i, paramsLength, declaration;
        types = [];
        paramsLength = node.params.length;


        for (i = 0; i < paramsLength; i++) {
            param = node.params[i];
            declaration = param.typeDeclaration;
            if (typeof declaration !== 'undefined') {
                param.typeDeclaration.update('');
                if (declaration.type === 'TypeDeclaration') {
                    type = param.typeDeclaration.name;
                    types.push(Utils.convertToDefault(type, declaration.optional));
                }
                else if (typeof declaration !== 'undefined' && declaration.type === 'FunctionTypeDeclaration') {
                    var higherorderType = higherorderParams(param.typeDeclaration);
                    if (declaration.optional) {
                       types.push(optional(higherorderType));
                    } else {
                        types.push(higherorderType);
                    }
                }
                else {
                    types.push(returnAnyType());
                }
            }
        }
        if (types.length === 0 ) {
            types = [returnAnyType()];
        }
        return types;
    }

    var getParamsList = function(node) {
        var i, params;
        params = [];
        for (i = 0; i < node.params.length; i++) {
            params.push(node.params[i].name);
        }
        return params;
    }

    Utils.convertToDefault = convertToDefault;
    Utils.wrapFunction = wrapFunction;
    Utils.processParams = processParams;
    Utils.higherorderParams = higherorderParams;
    Utils.getParamsList = getParamsList;
    Utils.returnAnyType = returnAnyType;
    Utils.object = object;
    Utils.guard = guard;
    Utils.fun = fun;

    return Utils;
})(Utils || {});



exports.toContracts = function(src) {
    return falafel(src, function (node) {

        if (node.type === "InterfaceDeclaration") {
            var i, key, keys, opt, value, values, name;
            keys = [];
            values = [];
            name = node.name.name;
            for (i = 0; i < node.object.length; i++) {
                key = node.object[i].key;
                value = node.object[i].value;
                opt = key.optional;
                keys.push(key);
                if (value.typeDeclaration.type === "TypeDeclaration") {
                    values.push(Utils.convertToDefault(value.typeDeclaration.name, opt));
                }
                else if (value.typeDeclaration.type === "FunctionTypeDeclaration") {
                    types = Utils.higherorderParams(value.typeDeclaration);
                    values.push(types);
                }
            }
            node.update(Utils.object(name, keys, values));
        }

        if (node.type === "AmbientVariableDeclaration") {
          var declaration, type, identifier;
          identifier = node.id.name;
          declaration = node.declaration;
          if (typeof declaration !== 'undefined') {
            if (declaration.type === 'TypeDeclaration') {
              type = Utils.convertToDefault(declaration.name);
            } else if (declaration.type === 'FunctionTypeDeclaration') {
              type = Utils.higherorderParams(declaration);
            }
            node.update(identifier + "=" + Utils.guard(type, identifier));
          } else {
            node.update('');
          }
        }

        if (node.type === "AmbientFunctionDeclaration") {
          var declaration, type, identifier;
          identifier = node.id.name;
          declaration = node.declaration;
          type = Utils.higherorderParams(declaration);
          if (declaration.type === 'FunctionTypeDeclaration') {
            node.update(identifier + "=" + Utils.guard(type, identifier));
          }

        }



        if (node.type === "FunctionExpression" || node.type === "FunctionDeclaration") {
            var types, returnType, name;
            types = Utils.processParams(node);

            if (typeof node.returnType !== 'undefined') {
                returnType = Utils.convertToDefault(node.returnType.name);
                node.returnType.update('');
            } else {
                returnType = Utils.returnAnyType();
            }
            if (node.id) {
                name = node.id.name;
            }
            node.update(Utils.wrapFunction(types, returnType, node, name));
        }

        if (node.type === "VariableDeclaration") {
            var identifier, typeDeclaration, declaration, type;

            if (node.declarations.length === 1) {
                declaration = node.declarations[0];
                typeDeclaration = declaration.typeDeclaration;
                if (typeof typeDeclaration !== 'undefined' && typeDeclaration.type === "TypeDeclaration") {
                    type = Utils.convertToDefault(typeDeclaration.name);
                    declaration.typeDeclaration.update('');
                    if (typeof declaration.init !== 'undefined')
                        declaration.init.update(Utils.guard(type, declaration.init.source()));
                } else if (typeof typeDeclaration !== 'undefined' && typeDeclaration.type === "FunctionTypeDeclaration") {
                    declaration.typeDeclaration.update('');
                    type = Utils.higherorderParams(typeDeclaration);
                    if (typeof declaration.init !== 'undefined') {
                        declaration.init.update(Utils.guard(type, declaration.init.source()));
                    } else {
                        //todo: when no initialisation data given
                    }
                }
            } else {
                //todo: multiparam declarations!
            }
            
        }


    });
}




