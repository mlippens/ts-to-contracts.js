/**
 * Created by Michael on 4/03/14.
 */
var falafel = require('falafel');

var module = "(function(a: (b: number)=> string): string {});";
var Utils;

Utils = (function (Utils) {

    var convertToDefault = function (id) {
        switch(id){
            case 'string': return "Str";
            case 'number': return "Num";
            case 'boolean': return "Bool";
            case 'any': return "Any";
            case 'void': return "Any";
            default: return id;
        }
    }

    var guard = function(fun,guarded) {
        return "guard("+ fun + ", "+ guarded + ")";
    }

    var fun = function(dom,codom) {
        return "fun("+ toArrayString(dom) + "," + codom + ", {} )";
    }
    var toArrayString = function(str) {
        return "[" + str + "]";
    }

    var wrapFunction = function(dom,codom,params,node) {
        return guard(fun(dom,codom),"function (" + params.join(',') + ")" + node.body.source());
    }

    var higherorderParams = function(type){
        //we have a function contract anyway!
        //worst case we have any->any
        var i, param, types, returnType, declaration;
        types = [];
        returnType = "Any";
        for (i = 0;i < type.expression.params.length; i++) {
            param = type.expression.params[i];
            declaration = param.typeDeclaration;
            if (typeof declaration !== 'undefined' && declaration.type === 'TypeDeclaration') {
                types.push(convertToDefault(declaration.name));
            }
            else if (param.typeDeclaration.type === 'FunctionTypeDeclaration') {
                types.push(higherorderParams(param.typeDeclaration.type));
            }
            else {
                types.push("Any");
            }
        }

        if (type.returnType !== 'undefined') {
            returnType = convertToDefault(type.returnType.name);
        }
        if (types.length === 0) {
            types = ["Any"];
        }
        return fun(types,returnType);
    }

    var processParams = function(node){
        var types, type, param, i, paramsLength, declaration;
        types = [];
        paramsLength = node.params.length;


        for (i = 0; i < paramsLength; i++) {
            param = node.params[i];
            declaration = param.typeDeclaration;
            if (typeof declaration !== 'undefined' && declaration.type === 'TypeDeclaration') {
                type = param.typeDeclaration.name;
                types.push(Utils.convertToDefault(type));
            }
            else if (typeof declaration !== 'undefined' && declaration.type === 'FunctionTypeDeclaration') {
                types.push(higherorderParams(param.typeDeclaration));
            }
            else {
                types.push("Any");
            }
        }
        if (types.length === 0 ) {
            types = ["Any"];
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
    Utils.getParamsList = getParamsList;

    return Utils;
})(Utils || {});


var src = falafel(module, function (node) {
    if(node.type === "FunctionExpression"){
        var types, params, returnType;

        returnType = "Any";
        types = Utils.processParams(node);
        params = Utils.getParamsList(node);

        if (typeof node.returnType !== 'undefined') {
            returnType = Utils.convertToDefault(node.returnType.name);
        }
        node.update(Utils.wrapFunction(types,returnType,params,node));
    }

});



console.log(src);


