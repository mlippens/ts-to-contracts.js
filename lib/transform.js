/**
 * Created by Michael on 4/03/14.
 */
var falafel, utils, moduleName, tmpl, fs, config;
falafel = require('falafel');
tmpl = require('./utils');
fs = require('fs');
config = require('./config');

utils = (function (utils) {

    var prefix = config.contracts_prefix;

    var FunctionContract = (function() {

        function FunctionContract(argTypes, returnType, opt) {
            this.argTypes = argTypes;
            this.returnType = returnType;
            this.optional = opt;
        }

        FunctionContract.prototype.toContract = function() {
            var result = fun(this.argTypes, this.returnType);
            if (typeof this.optional !== 'undefined' && this.optional) {
                //return optional(result);
            }
            return result;
        }
        return FunctionContract;
    })();

    var ObjectContract = (function() {
        function ObjectContract(keys, values, callType, newType) {
            this.keys = keys;
            this.values = values;
            this.callType = typeof callType !== 'undefined' ? callType : false;
            this.newType = typeof newType !== 'undefined' ? newType : false;
        }

        ObjectContract.prototype.toContract = function() {
            var i, obj, res;
            res = [];
            for (i = 0; i < this.keys.length; i++) {
                var k = this.keys[i];
                var v = this.values[i];
                res.push(k.name + ":" + v);
            }
            obj = prefix + "object({" + res.join(",") + "}, {})";
            if (this.callType && this.newType) {
                obj = and(obj, fun_new_call(this.newType, this.callType));
            } else if (this.newType) {
                obj = and(obj, this.newType.toContract());
            } else if (this.callType) {
                obj = and(obj, this.callType.toContract());
            }
            return obj;
        }
        return ObjectContract;
    })();

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
				res = new FunctionContract("Any", "Any").toContract();
			break;
			case 'Array':
				res = array;
			break;
			case 'Object':
				res = new ObjectContract([], []).toContract();
			break;
			default:
				res = id;
		}
		if (typeof array !== 'undefined' && array) {
			//basic array support
			res = prefix + "Arr";
		}
        /* we only need one place to check for optional?! */
		/*if (typeof opt !== 'undefined' && opt) {
			return optional(res);
		}*/
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

	var guard = function(contract, guarded) {
        return templatify("guard", {"contract": contract, "guarded": guarded, "module": moduleName});
	};

	var fun = function(dom, codom, opt) {
        return templatify("fun", {"dom": dom,"rng": codom});
	};

    var fun_new_call = function(newHandler, callHandler, opt) {
        if (typeof opt === 'undefined') {
            opt = {};
        }
        return templatify("fun_new_call",
            {"newdom": newHandler.argTypes, "newrng": newHandler.returnType,
             "calldom": callHandler.argTypes, "callrng": callHandler.returnType});
    };

    var and = function(k1, k2) {
        return templatify("and", {"contract1": k1, "contract2": k2});
    };

	var or = function(k1, k2) {
        return templatify("or", {"contract1": k1, "contract2": k2});
	};

	var array = prefix + "Arr";

	var optional = function(str) {
        return templatify("optional", {"contract": str});
	};

	var wrapFunction = function(dom, codom, node, name) {
		var prefix = "";
		if (typeof name !== 'undefined') {
			node.id.update('');
			prefix = config.toplevelvar + name + " = ";
		}
		return prefix + guard(fun(dom,codom), node.source());
	}

	var processDeclaration = function(declaration) {
		var type;
        if (typeof declaration !== 'undefined') {
            if (declaration.type === 'TypeDeclaration') {
                type = convertToDefault(declaration);
            } else if (declaration.type === 'FunctionTypeDeclaration') {
                type = higherorderParams(declaration).toContract();
            } else if (declaration.type === 'ObjectTypeDeclaration') {
                type = processObject(declaration).toContract();
            }
        } else {
            type = returnAnyType();
        }
		if (typeof declaration !== 'undefined' && typeof declaration.optional !== 'undefined' && declaration.optional) {
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
		return new FunctionContract(types, returnType);
	}

	var processParams = function(node){
		var types, returnType, param, i, paramsLength, declaration;
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
        if (typeof node !== 'undefined' && typeof node.returnType !== 'undefined') {
            node.returnType.update('');
            returnType = convertToDefault(node.returnType);
        } else {
            returnType = returnAnyType();
        }
		if (types.length === 0 ) {
			types = "";
		}
        return new FunctionContract(types, returnType);
	}

	var processObject = function(node) {
		var item, key, value, values, i, keys, callType, newType;
		keys = [];
		values = [];
		for (i = 0; i < node.body.length; i++) {
            item = node.body[i];
            key = item.key;
            value = item.value;

			if (typeof item.functionType !== 'undefined') {
				callType = higherorderParams(item.functionType);
			} else if (item.key.name === 'new') {
                newType = higherorderParams(value.typeDeclaration);
            } else {
				if (typeof value.typeDeclaration !== 'undefined') {
					keys.push(key);
					values.push(processDeclaration(value.typeDeclaration));
				}
			}
		}
		return new ObjectContract(keys, values, newType, callType);
	}

	var getParamsList = function(node) {
		var i, params;
		params = [];
		for (i = 0; i < node.params.length; i++) {
			params.push(node.params[i].name);
		}
		return params;
	}

    var templatify = tmpl;

	utils.convertToDefault = convertToDefault;
	utils.wrapFunction = wrapFunction;
	utils.processDeclaration = processDeclaration;
	utils.processParams = processParams;
	utils.processObject = processObject;
	utils.higherorderParams = higherorderParams;
	utils.getParamsList = getParamsList;
	utils.returnAnyType = returnAnyType;
	utils.guard = guard;
	utils.fun = fun;
    utils.fun_new_call = fun_new_call;
    utils.templatify = templatify;

	return utils;
})(utils || {});



exports.toContracts = function(src, module) {
	moduleName = module;

	return falafel(src, function (node) {

		if (node.type === "InterfaceDeclaration") {
			var  name, result;
			name = node.name.name;
			result = utils.processObject(node).toContract();
			node.update("var "+name+" = "+ result + ";");
		}

		if (node.type === "AmbientVariableDeclaration") {
			var declaration, type, identifier;
			identifier = node.id.name;
			declaration = node.declaration;			  
			if (typeof declaration !== 'undefined') {
				type = utils.processDeclaration(declaration);
				node.update(config.toplevelvar + identifier + "=" + utils.guard(type, identifier));
			} else {
				node.update('');
			}
		}

		if (node.type === "AmbientFunctionDeclaration") {
			var declaration, type, identifier;
			identifier = node.id.name;
			declaration = node.declaration;
			type = utils.processDeclaration(declaration);
			if (declaration.type === 'FunctionTypeDeclaration') {
				node.update(config.toplevelvar + identifier + "=" + utils.guard(type, identifier));
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
            /* merge static and instance methods in one contract */
            instanceMembers = utils.processObject(instanceMembers).toContract();
            staticMembers = utils.processObject(staticMembers);
            staticMembers.keys.push({name: "prototype"});
            staticMembers.values.push(instanceMembers);
            classContract = utils.guard(staticMembers.toContract(), className);
            var opts = {"className": className, "contract": classContract};
            node.update(utils.templatify('ambientclass', opts));
        }

		if (node.type === "FunctionExpression" || node.type === "FunctionDeclaration") {
			var res, name;
			res = utils.processParams(node);
			if (node.id) {
				name = node.id.name;
			}
			node.update(utils.wrapFunction(res.argTypes, res.returnType, node, name));
		}

		if (node.type === "VariableDeclaration") {
			var typeDeclaration, declaration, type;

			if (node.declarations.length === 1) {
				declaration = node.declarations[0];
				typeDeclaration = declaration.typeDeclaration;
				type = utils.processDeclaration(typeDeclaration);
                if (typeof declaration.typeDeclaration !== 'undefined') {
                    declaration.typeDeclaration.update('');
                }
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