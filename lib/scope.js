/**
* Created by mello on 5/7/14.
*
* This file just gives us back a representation of the nesting in the file
* (so i.e. with respect to modules.)
* This is needed because of the fact that falafel always treats it's children first.
* that way we have no idea of knowing where we are.
*/
var ast = require('./ast');

var parse, scope_map, toString, toplevel_scope, current_scope, config;
parse = require('esprima').parse;
config = require('./config');
scope_map = new Map();
toString = Object.prototype.toString;

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

/***
* Centralised object for registering new variables or resetting all.
* @type {{register: (function(any): (any|any)), get: (function(): Array), reset: (function(): undefined)}}
*/
var registerUtils = (function () {
    var registered, register, exports;
    registered = config["predefined_contracts"];

    register = function (name) {
        var contains;
        contains = registered.some(function (e) {
            return e === name;
        });
        if (contains) {
            return register("_".concat(name));
        } else {
            registered.push(name);
            return name;
        }
    };

    exports = {
        "register": register,
        "get": function () {
            return registered;
        },
        "reset": function () {
            registered = config["predefined_contracts"];
        }
    };

    return exports;
})();

/***
* Class that takes care of scopes.
* Core functions are entering (enter_scope()) or exiting scope (exit_scope())
* As well as either registering in a scope, or doing a lookup in a scope.
*/
var Scope = (function () {
    function Scope(level) {
        this.level = level;
        this.frame = [];
        this.registered_frame = {};
        this.parent = null;
    }
    Scope.getTopLevelScope = function () {
        return toplevel_scope;
    };

    Scope.getScope = function (identifier) {
        return scope_map.get(identifier.toString());
    };

    Scope.prototype.enter_scope = function () {
        var new_scope = new Scope(this.level + 1);
        new_scope.parent = this;
        return new_scope;
    };

    Scope.prototype.exit_scope = function () {
        if (this.parent != null) {
            return this.parent;
        }
        throw new Error("Cannot exit toplevel scope!");
    };

    /**
    * identifier is toString() because arrays are compared by reference whilst strings aren't
    * We don't want comparison by reference because they won't be the same
    * @param name of the variable registered
    * @param identifier, the object that will be passed to retrieve the scope
    */
    Scope.prototype.register = function (name, identifier) {
        var registered = registerUtils.register(name);
        scope_map.set(identifier.toString(), this);
        this.registered_frame[name] = registered;
        this.frame.push(name);
    };

    Scope.prototype.lookup = function (item) {
        var i, splitted, current;
        if (typeof item === "undefined") {
            return false;
        }
        splitted = item.split(".");
        if (splitted.length > 1) {
            //todo: what if dotted scope?
        } else {
            for (i = 0; i < this.frame.length; i++) {
                current = this.frame[i];
                if (item === current) {
                    return this.registered_frame[item];
                }
            }
            if (this.parent != null) {
                return this.parent.lookup(item);
            } else {
                return false;
            }
        }
    };
    Scope.top_level = 0;
    return Scope;
})();
exports.Scope = Scope;

(function (utils) {
    utils.getRegisteredVariables = registerUtils.get;
    utils.registerVariable = registerUtils.register;

    //possibly only useful for tests
    utils.resetRegisteredVariables = registerUtils.reset;
})(exports.utils || (exports.utils = {}));
var utils = exports.utils;

/***
* Walks the tree and builds the scope.
* The scope is put in a Map, and the keys are the range of the associated object.
* Scopes resolve around Modules and only modules can enter new scope levels.
* Any type that can be a "type" is tracked here. These are
* Modules, Classes and Interfaces
* @param src
* @returns {Scope}
*/
function walk(src) {
    toplevel_scope = new Scope(Scope.top_level);
    current_scope = toplevel_scope;

    var tree = parse(src, { "range": true });
    walk(tree);

    function walkModule(tree) {
        var name, internal_name, external_name, declaration;
        for (var i = 0; i < tree.body.length; i++) {
            var node = tree.body[i];
            if (ast.isModuleMember(node)) {
                declaration = node.typeDeclaration;
                if (ast.isClass(declaration)) {
                    current_scope.register(declaration.id.name, declaration.range);
                } else if (ast.isInterface(declaration)) {
                    current_scope.register(declaration.name.name, declaration.range);
                } else if (ast.isModule(declaration)) {
                    external_name = declaration.id.value;
                    internal_name = declaration.id.name;
                    name = typeof external_name === 'undefined' ? internal_name : external_name;
                    current_scope.register(name, node.range);
                    current_scope = current_scope.enter_scope();
                    walkModule(declaration);
                } else {
                    current_scope.register(node.id.name, declaration.range);
                }
            } else {
                //exportstatement is not a modulemember!
            }
        }
        current_scope = current_scope.exit_scope();
    }

    /***
    * A "flat" walk over the AST.
    * Only considers top-level scope
    * @param tree
    * @param dict
    */
    function walk(tree) {
        var newscope, node, externalname, internalname, name;

        for (var i = 0; i < tree.body.length; i++) {
            node = tree.body[i];
            if (ast.isModule(node)) {
                externalname = node.id.value;
                internalname = node.id.name;
                name = typeof externalname === 'undefined' ? internalname : externalname;
                current_scope.register(name, node.range);
                current_scope = current_scope.enter_scope();
                walkModule(node);
            } else if (ast.isClass(node)) {
                var name = node.id.name;
                current_scope.register(name, node.range);
            } else if (ast.isInterface(node)) {
                var name = node.name.name;
                current_scope.register(name, node.range);
            }
        }
    }
    return toplevel_scope;
}
exports.walk = walk;
;
//# sourceMappingURL=scope.js.map
