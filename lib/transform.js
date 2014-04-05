/**
 * Created by Michael on 4/03/14.
 */
var falafel, utils, moduleName, tmpl, fs;
falafel = require('falafel');
tmpl = require('./microtemplating').tmpl;
fs = require('fs');

utils = (function (utils) {

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
		var key, value, values, i, keys, types, funType;
		keys = [];
		values = [];
		for (i = 0; i < node.body.length; i++) {
			if (typeof node.body[i].functionType !== 'undefined') {
				funType = higherorderParams(node.object[i].functionType);
			} else {
				key = node.body[i].key;
				value = node.body[i].value;
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

	utils.convertToDefault = convertToDefault;
	utils.wrapFunction = wrapFunction;
	utils.processDeclaration = processDeclaration;
	utils.processParams = processParams;
	utils.processObject = processObject;
	utils.higherorderParams = higherorderParams;
	utils.getParamsList = getParamsList;
	utils.returnAnyType = returnAnyType;
	utils.object = object;
	utils.guard = guard;
	utils.fun = fun;
	utils.globals = globals;

	return utils;
})(utils || {});



exports.toContracts = function(src, module) {
	moduleName = module;

	return falafel(src, function (node) {

		if (node.type === "InterfaceDeclaration") {
			var  name, result;
			name = node.name.name;
			result = utils.processObject(node); 
			node.update("var "+name+" = "+ utils.object(result)+ ";");
		}

		if (node.type === "AmbientVariableDeclaration") {
			var declaration, type, identifier;
			identifier = node.id.name;
			declaration = node.declaration;			  
			if (typeof declaration !== 'undefined') {
				type = utils.processDeclaration(declaratoin);
				node.update(utils.globals + identifier + "=" + utils.guard(type, identifier));
			} else {
				node.update('');
			}
		}

		if (node.type === "AmbientFunctionDeclaration") {
			var declaration, type, identifier;
			identifier = node.id.name;
			declaration = node.declaration;
			type = utils.higherorderParams(declaration);
			if (declaration.type === 'FunctionTypeDeclaration') {
				node.update(utils.globals + identifier + "=" + utils.guard(type, identifier));
			}
		}

        if (node.type === "ClassDeclaration" && typeof node.ambient !== 'undefined' && node.ambient) {
            /* split static properties are split from non-static */
            var elements, value, staticMembers, instanceMembers, classContract, className;
            className = node.id.name;
            staticMembers = {'body': []};
            instanceMembers = {'body': [] };
            elements = node.body;
            for (var i=0; i< elements.length; i++) {
                value = elements[i].value;
                if (typeof value.static !== 'undefined' && value.static) {
                    staticMembers.body.push(elements[i]);
                } else {
                    instanceMembers.body.push(elements[i]);
                }
            }
            instanceMembers = utils.object(utils.processObject(instanceMembers));
            staticMembers = utils.processObject(staticMembers);
            staticMembers.keys.push({name: "prototype"});
            staticMembers.values.push(instanceMembers);
            classContract = utils.guard(utils.object(staticMembers), className);
            var file = fs.readFileSync('lib/templates/ambientclass.js', "utf8");

            node.update(tmpl(file, {"className": className, "contract": classContract}));

        }

		if (node.type === "FunctionExpression" || node.type === "FunctionDeclaration") {
			var types, returnType, name;
			types = utils.processParams(node);

			if (typeof node.returnType !== 'undefined') {
				returnType = utils.convertToDefault(node.returnType);
				node.returnType.update('');
			} else {
				returnType = utils.returnAnyType();
			}
			if (node.id) {
				name = node.id.name;
			}
			node.update(utils.wrapFunction(types, returnType, node, name));
		}

		if (node.type === "VariableDeclaration") {
			var identifier, typeDeclaration, declaration, type;

			if (node.declarations.length === 1) {
				declaration = node.declarations[0];
				typeDeclaration = declaration.typeDeclaration;
				type = utils.processDeclaration(typeDeclaration);
				declaration.typeDeclaration.update('');
				if (typeof declaration.init !== 'undefined') {
					declaration.init.update(utils.guard(type, declaration.init.source()));   
				} else {
					//todo: when no initialisation data given  
				}
			} else {
				//todo: multiparam declarations!
			}   
		}
	});
}