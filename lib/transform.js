/**
 * Created by Michael on 4/03/14.
 */
var falafel, Utils, moduleName;
falafel = require('falafel');

Utils = (function (Utils) {

	var prefix = "C.";
	var globals = "globals.";

	var convertToDefault = function (declaration) {
		var res, id, opt, array;
		id = declaration.name;
		opt = declaration.optional;
		array = declaration.array;
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
				res = prefix + "Undefined";
			break;
			case 'Function':
				res = fun("Any","Any");
			break;
			case 'Array':
				res = array;
			break;
			case 'Object':
				res = prefix + "object({},{})";
			break;
			default:
				res = id;
		}
		if (typeof array !== 'undefined' && array) {
			//basic array support
			res = prefix + "Arr";
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
		var module = "";
		if (typeof moduleName !== 'undefined') {
			module = ", " + "\"" + moduleName + "\"";
		}
		return "guard("+ contract + ", "+ guarded + module + ")";
	});

	var fun = prefixIt(function(dom, codom, opt) {
		if (typeof opt === 'undefined') {
			opt = {};
		}
		return "fun("+ toArrayString(dom) + "," + codom + ", {})";
	});

	var and = prefixIt(function(k1, k2) {
		return "and("+k1+","+k2+")";
	});

	var or = prefixIt(function(k1, k2) {
		return "or("+k1+","+k2+")";
	});

	var array = prefix + "Arr";

	var object = function (object) {
		var funType = typeof object.funType !== 'undefined' ? object.funType : void 0;
		var keys = object.keys;
		var vals = object.values;
		var i, obj;
		var res = [];
		for (i = 0; i < keys.length; i++) {
			var k = keys[i];
			var v = vals[i];
			res.push(k.name + ":" + v);
		}
		obj = prefix + "object({" + res.join(",") + "}, {})";
		if (typeof funType !== 'undefined') {
			obj = and(obj, funType);
		}
		return obj;
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
			prefix = globals + name + " = ";
		}
		return prefix + guard(fun(dom,codom), node.source());
	}

	var processDeclaration = function(declaration) {
		var type;
		if (typeof declaration !== 'undefined' && declaration.type === 'TypeDeclaration') {
			type = convertToDefault(declaration);
		} else if (typeof declaration !== 'undefined' && declaration.type === 'FunctionTypeDeclaration') {
			type = higherorderParams(declaration);
		} else if (typeof declaration !== 'undefined' && declaration.type === 'ObjectTypeDeclaration') {
			type = object(processObject(declarationn));
		} else {
			type = returnAnyType();
		}
		if (typeof declaration.optional !== 'undefined' && declaration.optional) {
			type = optional(type);
		}
		return type; 
	}

	var higherorderParams = function(type) {
		//we have a function contract anyway! Any->Any worst case
		var i, param, types, returnType, declaration;
		types = [];
		for (i = 0;i < type.expression.params.length; i++) {
			param = type.expression.params[i];
			declaration = param.typeDeclaration;
			if (typeof declaration !== 'undefined') {
				types.push(processDeclaration(declaration));              
			}     
		}

		if (typeof type.returnType !== 'undefined') {
			returnType = convertToDefault(type.returnType);
		} else {
			returnType = returnAnyType();
		}
		if (types.length === 0) {
			types = "";
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
				types.push(processDeclaration(declaration));
			}
		}
		if (types.length === 0 ) {
			types = "";
		}
		return types;
	}

	var processObject = function(node) {
		var key, value, values, i, opt, keys, types, funType;
		keys = [];
		types = [];
		values = [];
		for (i = 0; i < node.object.length; i++) {
			if (typeof node.object[i].functionType !== 'undefined') {
				funType = higherorderParams(node.object[i].functionType);
			} else {
				key = node.object[i].key;
				value = node.object[i].value;
				opt = key.optional;
				if (typeof value.typeDeclaration !== 'undefined') {
					keys.push(key);
					values.push(processDeclaration(value.typeDeclaration));
				}
			}
		}
		return {"keys": keys, "values": values, "funType": funType};
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
	Utils.processDeclaration = processDeclaration;
	Utils.processParams = processParams;
	Utils.processObject = processObject;
	Utils.higherorderParams = higherorderParams;
	Utils.getParamsList = getParamsList;
	Utils.returnAnyType = returnAnyType;
	Utils.object = object;
	Utils.guard = guard;
	Utils.fun = fun;
	Utils.globals = globals;

	return Utils;
})(Utils || {});



exports.toContracts = function(src, module) {
	moduleName = module;

	return falafel(src, function (node) {

		if (node.type === "InterfaceDeclaration") {
			var  name, result;
			name = node.name.name;
			result = Utils.processObject(node); 
			node.update("var "+name+" = "+ Utils.object(result)+ ";");
		}

		if (node.type === "AmbientVariableDeclaration") {
			var declaration, type, identifier;
			identifier = node.id.name;
			declaration = node.declaration;			  
			if (typeof declaration !== 'undefined') {
				type = Utils.processDeclaration(declaratoin);
				node.update(Utils.globals + identifier + "=" + Utils.guard(type, identifier));
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
				node.update(Utils.globals + identifier + "=" + Utils.guard(type, identifier));
			}
		}

		if (node.type === "FunctionExpression" || node.type === "FunctionDeclaration") {
			var types, returnType, name;
			types = Utils.processParams(node);

			if (typeof node.returnType !== 'undefined') {
				returnType = Utils.convertToDefault(node.returnType);
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
				type = Utils.processDeclaration(typeDeclaration);
				declaration.typeDeclaration.update('');
				if (typeof declaration.init !== 'undefined') {
					declaration.init.update(Utils.guard(type, declaration.init.source()));   
				} else {
					//todo: when no initialisation data given  
				}
			} else {
				//todo: multiparam declarations!
			}   
		}
	});
}
