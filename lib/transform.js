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
};

/* findIndex according to ES6. This is implemented in Chrome (V8) but not in node. */
if (typeof Array.prototype.findIndex === 'undefined') {
    Array.prototype.findIndex = function (predicate, thisValue) {
        var arr = Object(this);
        if (typeof predicate !== 'function') {
            throw new TypeError();
        }
        for(var i = 0; i < arr.length; i++) {
            if (i in arr) {
                var elem = arr[i];
                if (predicate.call(thisValue, elem, i, arr)) {
                    return i;
                }
            }
        }
        return -1;
    };
}



utils = (function (utils) {

    /* registers variables that should be declared at the top of the file */
    var registeredVariables = [];
    var registeredClasses = {};
    var registeredModules = {};

    var prefix = config.contracts_prefix;

    var merge = function(o1, o2) {
        var prop, o3, f;
        o3 = {};
        f = function(o) {
            for (prop in o) {
                if (o.hasOwnProperty(prop)) {
                    o3[prop] = o[prop]
                }
            }
        };
        f(o1);
        f(o2);
        return o3;
    };

    var ClassContract = (function () {
        var ClassContract = function(name, instanceMembers, staticMembers, constructor) {
            this.name = name;
            this.instanceMembers = instanceMembers || {"body": []};
            this.staticMembers = staticMembers || {"body": []};
            this.constructor = constructor;
        };

        ClassContract.prototype.toContract = function() {
            var instanceMembers, staticMembers;
            instanceMembers = utils.processInterface(this.instanceMembers).toContract();
            staticMembers = utils.processInterface(this.staticMembers);
            staticMembers.setOpts({"class": instanceMembers})
            staticMembers.newType = this.constructor;
            return staticMembers.toContract();
        };

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
            this.opt = {};
            this.callType = typeof callType !== 'undefined' ? callType : false;
            this.newType = typeof newType !== 'undefined' ? newType : false;
        };

        ObjectContract.prototype.setOpts = function(opt) {
            this.opt = merge(this.opt, opt);
        };

        ObjectContract.prototype.toContract = function () {
            var obj;
            obj = tmpl("object", {"keys": this.keys, "values": this.values, "opt": this.opt});
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

    /***
     * If the name is a literal, we are talking about external modules.
     * These can be used with Typescript's, import/require syntax!
     * When we have an "export = type" expression, all the rest is irrelevant and doesn't matter no more.
     * For the rest, internal and external modules have the same capabilities.
     */
    var ModuleContract = (function () {
        var ModuleContract =  function(name, objContract) {
            if (name.type === "Literal") {
                this.moduleName = name.value;
                this.external = true;
            } else {
                this.moduleName = name.name;
                this.external = false;
            }
            this.moduleContract = objContract;
            this.moduleContract.setOpts({"forgiving": true});
            //we push just plain source for interfaces, nothing needs to change!
            this.interfaces = [];
            //we push the contract here, because we need to adapt it because we deal with a class within a module
            this.classes = [];
            this.modules = [];
        };

        /**
         * an interface is a type, but you should be able to reference it from outside
         * and in the same file if it is ambient (either external or internal)
         * If it is an implementation then export does really matter.
         * @param objectContract
         */
        ModuleContract.prototype.addInterface = function(objectContract) {
            this.interfaces.push(objectContract);
        };

        ModuleContract.prototype.addClass = function(objectContract) {
            this.classes.push(objectContract);
        };

        // doesn't work just yet.
        ModuleContract.prototype.addModule = function(moduleContract) {
            this.modules.push(moduleContract);
        };

        /***
         * First print all interfaces, then classes, locally defined(!)
         * then the object contract that uses these contracts
         */
        ModuleContract.prototype.toContract = function() {
            var i, result, new_name, actual_name, idx, keys;
            result = "";
            for (i = 0; i < this.interfaces.length; i ++) {
                result = result + this.interfaces[i];
            }
            for (i = 0; i < this.classes.length; i ++) {
                // we register but here, when we are "sure" the variable needs to exist.
                actual_name = this.classes[i].name;
                new_name = registerVariable(actual_name);
                //substitute the name in the contract for the one we "registered" to be defined.
                keys = this.moduleContract.keys;
                idx = keys.findIndex(function (e) { return e.name === actual_name });
                this.moduleContract.values[idx] = new_name;
                result = result + defineVariable(new_name, this.classes[i].toContract());
            }
            if (this.external) {
                result = result + defineExportVariable(this.moduleName, guard(this.moduleContract.toContract(), this.moduleName));
            } else {
                // in this case we just register it, and don't export.
                new_name = registerVariable(this.moduleName);
                result = result + defineVariable(new_name, this.moduleContract.toContract());
            }
            return result;
        };

        return ModuleContract;
    })();

    var ExportContract = (function () {
        var ExportContract = function (id, type) {
            if (id.type === "Literal") {
                this.external = true;
                this.name = id.value;
            } else {
                this.external = false;
                this.name = id.name;
            }
            this.type = type;
        };

        ExportContract.prototype.toContract = function () {
            var result, new_name;
            if (this.external) {
                result = tmpl("exportdeclaration", { value: guard(this.type.name, this.name) }).addSemiColon();
                result = result + prefix + "setExported("+ this.type.name + "," + "'" + this.type.name + "')";
            } else {
                new_name = registerVariable(this.moduleName);
                result = defineVariable(new_name, this.type);
            }
            return result;
        };

        return ExportContract;
    })();

    var convertToDefault = function (declaration) {
        var res, id, array;
        id = declaration.name;
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
                res = prefix + "check(function(e){ return typeof e === 'function'}, 'Function')";
                break;
            case 'Array':
                res = prefix + "check(function(e){ return Array.isArray(e); }, 'Array')";
                break;
            case 'Object':
                res = new ObjectContract([], []).toContract();
                break;
            case 'RegExp':
                res = prefix + "check(function(e){ return e instanceof RegExp}, 'RegExp')";
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

            //this just does a check and then passes through the array.
            //we could also support typed arrays here, but there is no guarantee that the user enters wrong values
            res = prefix + "check(function(e){ return Array.isArray(e); }, 'Array')";
        }
        return res;
    };

    var returnAnyType = function () {
        return prefix + "Any";
    };

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

    var optional = function (str) {
        return tmpl("optional", {"contract": str});
    };

    var overload = function (arr){
        return tmpl("overload", {"contracts": arr});
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
        var i, param, types, returnType, declaration, opts;
        opts = {};
        types = [];
        for (i = 0; i < type.expression.params.length; i++) {
            param = type.expression.params[i];
            declaration = param.typeDeclaration;
            if (typeof declaration !== 'undefined') {
                types.push(processDeclaration(declaration));
            }
        }
        if (type.expression.rest !== null && typeof type.expression.rest.typeDeclaration !== 'undefined') {
            delete type.expression.rest.typeDeclaration.array;
            opts["rest"] = processDeclaration(type.expression.rest.typeDeclaration);
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
        return new FunctionContract(types, returnType, opts);
    };

    var processParams = function (node) {
        var types, returnType, param, i, paramsLength, declaration, opts;
        opts = {};
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
        if (node.expression.rest !== null && typeof node.expression.rest.typeDeclaration !== 'undefined') {
            //we delete this so process declaration won't return us an array contract
            delete node.expression.rest.typeDeclaration.array;
            opts["rest"] = processDeclaration(node.expression.rest.typeDeclaration);
        }
        else {
            returnType = returnAnyType();
        }
        if (types.length === 0) {
            types = "";
        }
        return new FunctionContract(types, returnType, opts);
    };

    var processInterface = function (node) {
        var item, key, value, values, i, j, keys, callType, newType, delayed;
        keys = [];
        values = [];
        delayed = [];
        for (i = 0; i < node.body.length; i++) {
            item = node.body[i];
            key = item.key;
            value = item.value;


            if (typeof item.functionType !== 'undefined') {
                callType = higherorderParams(item.functionType);
            }
            else if (item.key.name === 'new' /*&& node.type === 'InterfaceDeclaration'*/) {
                newType = higherorderParams(value.typeDeclaration);
            }
            else if (item.type === "IndexDeclaration") {
                    //todo: implement, but how? they are inherently also array contracts
            }
            else {
                if (typeof value.typeDeclaration !== 'undefined') {
                    value = processDeclaration(value.typeDeclaration);
                    if (keys.some(function(e) { return e.name === key.name;})) {
                        var inDelayed = false;

                        for (j = 0; j < delayed.length; j++) {
                            if (delayed[j].key === key){
                                delayed[j].contracts.push(value);
                                inDelayed = true;
                                break;
                            }
                        }
                        if (! inDelayed){
                            delayed.push({"key": key, "contracts": [value]});
                        }

                    } else {
                        keys.push(key);
                        values.push(value);
                    }
                }
            }
        }
        delayed.forEach(function(e) {
            var idx = keys.findIndex(function(el){return el.name === e.key.name});
            keys.splice(idx, 1);
            var k = values[idx];
            values.splice(idx, 1);
            e.contracts.push(k);
        });

        //add delayed contracts
        for (j=0; j < delayed.length; j ++) {
            keys.push(delayed[j].key);
            values.push(overload(delayed[j].contracts));
        }

        return new ObjectContract(keys, values, newType, callType);
    };

    /* only slightly differs from processing interfaces
     * but different implementations will allow to diverge
     */
    var processModule = function (node) {
        var keys, types, body, i, item, key, declaration, object, module, contract;
        object = new ObjectContract([], []);
        module = new ModuleContract(node.id, object);
        keys = object.keys;
        types = object.values;
        body = node.body;

        for (i = 0; i < body.length; i++ ) {
            item = body[i];
            key = item.id;
            if (typeof item.typeDeclaration !== 'undefined') {
                declaration = item.typeDeclaration;
                if (declaration.type === "InterfaceDeclaration") {
                    //todo: add scoping for interfaces
                    module.addInterface(declaration.source());
                }
                else if (declaration.type === "ClassDeclaration") {
                    /* whenever we process a class, we put it in a hashmap */
                    contract = getClass(declaration);
                    console.log(contract.name);
                    module.addClass(contract);
                    keys.push({"name": contract.name});
                    types.push(contract.name);
                }
                else if (declaration.type === "ModuleDeclaration") {
                    //todo: add scoping for nested modules
                    contract = getModule(declaration);
                    module.addModule(contract);
                    keys.push({"name": contract.moduleName});
                    types.push(contract.moduleName);
                }
                else {
                    //don't add to scope of a module: these don't produce actual types.
                    keys.push(key);
                    types.push(processDeclaration(item.typeDeclaration));
                }
            } else if (item.type === "ModuleExportStatement") {
                //return a module that will just assign exports to be equal to the contract
                //and then also wrap the name of the contract.
                return new ExportContract(node.id, item.id);
            } else {
                keys.push(key);
                types.push(returnAnyType());
            }
        }
        putModule(node, module);
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
        putClass(node, contract);
        return contract;
    };

    var defineVariable = function(name, value) {
        return tmpl("declaration", {"name": name, "value": value});
    };

    var defineExportVariable = function(name, value) {
        return tmpl("exportdeclaration", {"name": name,"value": value});
    };

    var getParamsList = function (node) {
        var i, params;
        params = [];
        for (i = 0; i < node.params.length; i++) {
            params.push(node.params[i].name);
        }
        return params;
    };

    /*var vars = (function (vars){
        var toplevelvars = [];
        var namespace = undefined;

        var addGlobalVar = function(name) {
            toplevelvars.push(name);
        };

        var startmodule = function(module) {
            var current = namespace;
            namespace = {"name": module, "body": [current]};
        };

        var endmodule = function() {
            var current = namespace;
            toplevelvars.push(current);
            namespace = undefined;
        };

        var register = function(name, global) {
            var i, index, result;
            if (global) {
                addGlobalVar(name);
                return;
            }
            for (i = 0; i < toplevelvars.length; i ++) {
                if (toplevelvars[i].name === name) {
                    index = i;
                    break;
                }
            }
            if (typeof index !== 'undefined') {
                delete toplevelvars[index];
            }
            namespace.body.push(name);
        };

        var find = function(name) {
            var splitted = name.split('.');
            var s = 0;
            var item;
            for (var i = 0; i < namespace.body.length; i ++) {
                item = namespace.body[i];
                if (item.name === splitted[s]) {
                    return item.varname;
                }
            }
        };

        return vars;
    })(vars || (vars = {}));*/

    /*
     * Registers variables that should be defined at top (hoisting)
     * We also keep track of the originals, so you could always "reverse" it.
     */
    var registerVariable = (function() {
        var moduleTree = {};

        var calc = function (name) {
            var contains;
            contains = registeredVariables.some(function(e) {
                return e === name;
            });
            if (contains) {
                return calc("_".concat(name));
            } else {
                registeredVariables.push(name);
                return name;
            }
        };

        var getNewName = function (originalname) {

            var newname = calc(originalname);
            return newname;
        };
        return getNewName;
    })();


    var getRegisteredVariables = function () {
        return registeredVariables;
    };

    /***
     * "hashing" on range is pretty safe here.
     */
    var hashUtils = (function(hashUtils) {
        hashUtils.put = function(obj) {
            return function (key, value) {
              var hashkey = key.range[0];
              var prop;
              for (prop in obj) {
                  if (obj.hasOwnProperty(prop) && prop === key) {
                      throw new Error("Key: "+ key + " was already registered in "+ obj);
                  }
              }
              obj[hashkey] = value;
            };
        };

        hashUtils.get = function(obj) {
            return function(key) {
                var hashkey = key.range[0];
                var result = obj[hashkey];
                if (typeof result !== 'undefined') {
                    return result
                }
                throw new Error("Key "+ key + " was not found in:"+ obj);
            }
        };

        return hashUtils;
    })(hashUtils || {});

    /*
     * Registers classes in a hash; if a class resides in a module, it can be easily retrieved;
     * this is useful to reify nested things we still want to interpret differently and access their
     * intermediate object representation if we find them nested inside another structure.
     * This does *NOT* need to happen with interfaces, although we need to store how it can be accessed
     * if inside a namespace (module).
     */
    var putClass = hashUtils.put(registeredClasses);
    var getClass = hashUtils.get(registeredClasses);
    var putModule = hashUtils.put(registeredModules);
    var getModule = hashUtils.get(registeredModules);

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
})(utils || (utils = {}));

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
}(ast || (ast = {})));

exports.getVars = utils.getRegisteredVariables;

exports.toContracts = function (src, module) {
    moduleName = module;
    //here we assume AMD by default; we register the variable not to be used.
    if (typeof module !== 'undefined') {
        utils.registerVariable(module);
    }

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
                node.update(utils.defineExportVariable(identifier, utils.guard(type, identifier)).addSemiColon());
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
                node.update(utils.defineExportVariable(identifier, utils.guard(type, identifier)).addSemiColon());
            }
        }

        if (node.type === "ModuleDeclaration") {
            var objectContract;
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
};