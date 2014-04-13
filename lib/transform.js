/**
 * Created by Michael on 4/03/14.
 */
var falafel, utils, moduleName, tmpl, fs, config;
falafel = require('falafel');
tmpl = require('./utils');
fs = require('fs');
config = require('./config');

/* patch string to easily chain to add semicolons */
String.prototype.addSemiColon = function() {
    var pattern = /;$/;
    if (pattern.test(this)) {
        return this;
    }
    return this + ";";
}

utils = (function (utils) {

    /* registers variables that should be declared at the top of the file */
    var registeredVariables = [];
    var registeredClasses = {};

    var prefix = config.contracts_prefix;

    var ClassContract = (function () {
        var ClassContract = function(name, instanceMembers, staticMembers, constructor) {
            this.name = name;
            this.instanceMembers = instanceMembers || {"body": []};
            this.staticMembers = staticMembers || {"body": []};
            this.constructor = constructor;
        }

        ClassContract.prototype.toContract = function() {
            var instanceMembers, staticMembers;
            instanceMembers = utils.processInterface(this.instanceMembers).toContract();
            staticMembers = utils.processInterface(this.staticMembers);
            staticMembers.keys.push({name: "prototype"});
            staticMembers.values.push(instanceMembers);
            staticMembers.newType = this.constructor;
            return staticMembers.toContract();
        }

        return ClassContract;
    })();

    var FunctionContract = (function () {

        var FunctionContract = function(argTypes, returnType, opt) {
            this.argTypes = argTypes;
            this.returnType = returnType;
            if (typeof opt === 'undefined') {
                this.opt = {};
            } else {
                this.opt = opt;
            }
        };

        FunctionContract.prototype.toContract = function () {
            return fun(this.argTypes, this.returnType, this.opt);
        };
        return FunctionContract;
    })();

    var ObjectContract = (function () {
        var ObjectContract = function(keys, values, callType, newType) {
            this.keys = keys;
            this.values = values;
            this.callType = typeof callType !== 'undefined' ? callType : false;
            this.newType = typeof newType !== 'undefined' ? newType : false;
        };

        ObjectContract.prototype.toContract = function () {
            var obj;
            obj = tmpl("object", {"keys": this.keys, "values": this.values, "opt": {}});
            if (this.callType && this.newType) {
                obj = and(obj, fun_new_call(this.newType, this.callType));
            }
            else if (this.newType) {
                obj = and(this.newType.toContract(), obj);
            }
            else if (this.callType) {
                obj = and(this.callType.toContract(), obj);
            }
            return obj;
        };
        return ObjectContract;
    })();

    var ModuleContract = (function () {
        var ModuleContract =  function(name, objContract) {
            this.moduleName = name;
            this.moduleContract = objContract;
            //we push just plain source for interfaces, nothing needs to change!
            this.interfaces = [];
            //we push the contract here, because we need to adapt it because we deal with a class within a module
            this.classes = [];
        };

        ModuleContract.prototype.addInterface = function(objectContract) {
            this.interfaces.push(objectContract);
        };

        ModuleContract.prototype.addClass = function(objectContract) {
            this.classes.push(objectContract);
        };

        /***
         * First print all interfaces, then classes, locally defined(!)
         * then the object contract that uses these contracts
         */
        ModuleContract.prototype.toContract = function() {
            var i, result;
            result = "";
            for (i = 0; i < this.interfaces.length; i ++) {
                result = result + this.interfaces[i];
            }
            for (i = 0; i < this.classes.length; i ++) {
                // we register but here, when we are "sure" the variable needs to exist.
                registerVariable(this.classes[i].name);
                result = result + defineVariable(this.classes[i].name, this.classes[i].toContract());
            }
            result = result + defineExportVariable(this.moduleName, guard(this.moduleContract.toContract(), this.moduleName));
            return result;
        };

        return ModuleContract;
    })();

    var convertToDefault = function (declaration) {
        var res, id, opt, array;
        id = declaration.name;
        //opt = declaration.optional;
        array = declaration.array;
        switch (id) {
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
            /* We can't support Arrays just now, they are broken!
             * Any [].concat or Array.isArray call will fail horribly!
             * We could avoid wrapping, but that's the same as not doing anything
             * since object contracts are only checked when a property is accessed.
             * Therefore, we just use the Any type for arrays.
             *
             * A possible fix: change contracts.js to use the new Proxy API.
             * This should be possible when using harmony-reflect, the shim for direct proxies.
             */
            res = prefix + "Any";
        }
        return res;
    }

    var returnAnyType = function () {
        return prefix + "Any";
    }

    var prefixIt = function (fn) {
        return function () {
            return prefix + fn.apply(this, arguments);
        }
    }

    var guard = function (contract, guarded) {
        return tmpl("guard", {"contract": contract, "guarded": guarded, "module": moduleName});
    };

    var fun = function (dom, codom, opt) {
        return tmpl("fun", {"dom": dom, "rng": codom, "opt": opt});
    };

    var fun_new_call = function (newHandler, callHandler) {
        return tmpl("fun_new_call",
            {"newdom": newHandler.argTypes, "newrng": newHandler.returnType,
             "calldom": callHandler.argTypes, "callrng": callHandler.returnType});
    };

    var and = function (k1, k2) {
        return tmpl("and", {"contract1": k1, "contract2": k2});
    };

    var or = function (k1, k2) {
        return tmpl("or", {"contract1": k1, "contract2": k2});
    };

    var array = prefix + "Any";

    var optional = function (str) {
        return tmpl("optional", {"contract": str});
    };

    var wrapFunction = function (dom, codom, node, name) {
        var prefix = "";
        if (typeof name !== 'undefined') {
            node.id.update('');
            prefix = config.toplevel_var + name + " = ";
        }
        return prefix + guard(fun(dom, codom), node.source());
    };

    var processDeclaration = function (declaration) {
        var type;
        if (typeof declaration !== 'undefined') {
            if (declaration.type === 'TypeDeclaration') {
                type = convertToDefault(declaration);
            }
            else if (declaration.type === 'FunctionTypeDeclaration') {
                type = higherorderParams(declaration).toContract();
            }
            else if (declaration.type === 'ObjectTypeDeclaration') {
                type = processInterface(declaration).toContract();
            }
        }
        else {
            type = returnAnyType();
        }
        if (typeof declaration !== 'undefined' && typeof declaration.optional !== 'undefined' && declaration.optional) {
            type = optional(type);
        }
        return type;
    };

    var higherorderParams = function (type) {
        //we have a function contract anyway! Any->Any worst case
        var i, param, types, returnType, declaration;
        types = [];
        for (i = 0; i < type.expression.params.length; i++) {
            param = type.expression.params[i];
            declaration = param.typeDeclaration;
            if (typeof declaration !== 'undefined') {
                types.push(processDeclaration(declaration));
            }
        }
        if (typeof type.returnType !== 'undefined') {
            returnType = convertToDefault(type.returnType);
        }
        else {
            returnType = returnAnyType();
        }
        if (types.length === 0) {
            types = "";
        }
        return new FunctionContract(types, returnType);
    };

    var processParams = function (node) {
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
        }
        else {
            returnType = returnAnyType();
        }
        if (types.length === 0) {
            types = "";
        }
        return new FunctionContract(types, returnType);
    };

    var processInterface = function (node) {
        var item, key, value, values, i, keys, callType, newType;
        keys = [];
        values = [];
        for (i = 0; i < node.body.length; i++) {
            item = node.body[i];
            key = item.key;
            value = item.value;

            if (typeof item.functionType !== 'undefined') {
                callType = higherorderParams(item.functionType);
            }
            else if (item.key.name === 'new' && node.type === 'InterfaceDeclaration') {
                newType = higherorderParams(value.typeDeclaration);
            }
            else {
                if (typeof value.typeDeclaration !== 'undefined') {
                    keys.push(key);
                    values.push(processDeclaration(value.typeDeclaration));
                }
            }
        }
        return new ObjectContract(keys, values, newType, callType);
    };

    /* only slightly differs from processing interfaces
     * but different implementations will allow to diverge
     */
    var processModule = function (node) {
        var keys, types, body, i, item, key, declaration, object, module, contract;
        object = new ObjectContract([], []);
        module = new ModuleContract(node.id.name, object);
        keys = object.keys;
        types = object.values;
        body = node.body;

        for (i = 0; i < body.length; i++ ) {
            item = body[i];
            key = item.id;
            if (typeof item.typeDeclaration !== 'undefined') {
                declaration = item.typeDeclaration;
                if (declaration.type === 'InterfaceDeclaration') {
                    module.addInterface(declaration.source());
                }
                else if (declaration.type === 'ClassDeclaration') {
                    /* whenever we process a class, we put it in a hashmap */
                    contract = getClass(declaration);
                    module.addClass(contract);
                    keys.push({"name": contract.name});
                    types.push(contract.name);
                }
                else {
                    keys.push(key);
                    types.push(processDeclaration(item.typeDeclaration));
                }
            } else {
                keys.push(key);
                types.push(returnAnyType());
            }
        }
        return module;
    };

    /***
     *
     * @param node
     */
    var processClass = function (node) {
        /* constructor.opt = {"newOnly": true};
         * we turn this off for now: the combination of object and function contract borks when
         * we use newonly in this case of classes */
        var className, staticMembers, instanceMembers, elements, key, value, constructor, contract;
        className = node.id.name;
        staticMembers = {'body': []};
        instanceMembers = {'body': [] };
        elements = node.body;
        /* split in instance and static members */
        for (var i = 0; i < elements.length; i++) {
            value = elements[i].value;
            key = elements[i].key;
            if (typeof value.static !== 'undefined' && value.static) {
                staticMembers.body.push(elements[i]);
            }
            else if (key.name === 'constructor') {
                constructor = utils.higherorderParams(value.typeDeclaration);
            } else {
                instanceMembers.body.push(elements[i]);
            }
        }
        contract =  new ClassContract(className, instanceMembers, staticMembers, constructor);
        registerClass(node, contract);
        return contract;
    };

    var defineVariable = function(name, value) {
        return tmpl("declaration", {"name": name, "value": value});
    };

    var defineExportVariable = function(name, value) {
        return tmpl("exportdeclaration", {"name": name,"value": value});
    }

    var getParamsList = function (node) {
        var i, params;
        params = [];
        for (i = 0; i < node.params.length; i++) {
            params.push(node.params[i].name);
        }
        return params;
    };

    /*
     * Registers variables that should be defined at top (hoisting)
     */
    var registerVariable = function (name) {
        var contains;
        contains = registeredVariables.some(function(e) {
            return e === name;
        });
        if (contains) {
            throw new Error("Variable "+ name + " is already registered!");
        }
        registeredVariables.push(name);
    };

    var getRegisteredVariables = function () {
        return registeredVariables;
    };

    /*
     * Registers classes in a hash; if a class resides in a module, it can be easily retrieved;
     */
    var registerClass = function(key, value) {
        var prop;
        for (prop in registeredClasses) {
            if (registeredClasses.hasOwnProperty(prop) && prop === key) {
                throw new Error("Class "+ key + " was already registered!");
            }
        }
        registeredClasses[key] = value;
    };

    var getClass = function(key) {
        return registeredClasses[key];
    };

    utils.convertToDefault = convertToDefault;
    utils.wrapFunction = wrapFunction;
    utils.processDeclaration = processDeclaration;
    utils.processParams = processParams;
    utils.processInterface = processInterface;
    utils.processModule = processModule;
    utils.processClass = processClass;
    utils.higherorderParams = higherorderParams;
    utils.getParamsList = getParamsList;
    utils.returnAnyType = returnAnyType;
    utils.guard = guard;
    utils.fun = fun;
    utils.fun_new_call = fun_new_call;
    utils.defineVariable = defineVariable;
    utils.defineExportVariable = defineExportVariable;
    utils.registerVariable = registerVariable;
    utils.getRegisteredVariables = getRegisteredVariables;

    return utils;
})(utils || {});

/**
 * Functions for easy checks
 */
var ast = (function(ast) {

    ast.isModuleMember = function(node) {
        return node.type === "ModuleMember";
    };

    ast.isModuleClass = function(node) {
        return ast.isModuleMember(node) && node.typeDeclaration.type === "ClassDeclaration";
    };

    ast.isModuleInterface = function(node) {
        return ast.isModuleMember(node) && node.typeDeclaration.type === "InterfaceDeclaration";
    };

    ast.isAmbientClass = function(node) {
        return node.type === "ClassDeclaration" && typeof node.type.ambient !== 'undefined' && node.type.ambient;
    };

    return ast;
}(ast || {}));

exports.getVars = utils.getRegisteredVariables;

exports.toContracts = function (src, module) {
    moduleName = module;

    return falafel(src, function (node) {

        if (node.type === "InterfaceDeclaration") {
            var i, name, result, item;
            name = node.name.name;
            result = utils.processInterface(node).toContract();
            /* support for extending interfaces */
            if (node.extends.length !== 0) {
                for (i = 0; i < node.extends.length; i++) {
                    item = node.extends[i].id.name;
                    result = tmpl('extend', {"orig": result, "extending": item});
                }
            }
            utils.registerVariable(name);
            node.update(utils.defineVariable(name, result).addSemiColon());
        }

        if (node.type === "AmbientVariableDeclaration") {
            var declaration, type, identifier;
            identifier = node.id.name;
            declaration = node.declaration;
            if (typeof declaration !== 'undefined') {
                type = utils.processDeclaration(declaration);
                node.update(utils.defineExportVariable(identifier, utils.guard(type, identifier)));
            }
            else {
                node.update('');
            }
        }

        if (node.type === "AmbientFunctionDeclaration") {
            var declaration, type, identifier;
            identifier = node.id.name;
            declaration = node.declaration;
            type = utils.processDeclaration(declaration);
            if (declaration.type === 'FunctionTypeDeclaration') {
                node.update(utils.defineExportVariable(identifier, utils.guard(type, identifier)));
            }
        }

        if (node.type === "ModuleDeclaration") {
            var objectContract, identifier, guarded;
            identifier = node.id.name;
            objectContract = utils.processModule(node);
            node.update(objectContract.toContract().addSemiColon());
        }

        /* Ambient class declarations */
        // differentiate between module classes and non module classes!
        //then we can easily "save" the classcontract to modify it later on.
        if (node.type === "ClassDeclaration" && typeof node.ambient !== 'undefined' && node.ambient) {
            var superclass, classContract, className;
            //not yet supported (!), needed for ambient declarations
            if (typeof node.superClass !== 'undefined') {
                superclass = node.superClass.name;
            }
            classContract = utils.processClass(node);
            className = classContract.name;
            classContract = utils.guard(classContract.toContract(), config.toplevel_prefix + className);
            var opts = {"className": className, "contract": classContract, "prefix": config.toplevel_prefix};
            node.update(tmpl("ambientclass", opts).addSemiColon());
        }

        /* regular class declarations */
        if (node.type === "ClassDeclaration" && (typeof node.ambient === 'undefined' || !node.ambient)) {
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
                }
                else {
                    //todo: when no initialisation data given
                }
            }
            else {
                //todo: multiparam declarations!
            }
        }
    });
}