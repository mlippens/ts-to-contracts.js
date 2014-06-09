/**
 * Created by mello on 5/7/14.
 *
 * This file just gives us back a representation of the nesting in the file
 * (so i.e. with respect to modules.)
 * This is needed because of the fact that falafel always treats it's children first.
 * that way we have no idea of knowing where we are.
 */

import ast = require('./ast');
declare function require(name: string);
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
var registerUtils = (function() {
    var registered, register, exports;
    registered = config["predefined_contracts"];

    register = function (name) {
        var contains;
        contains = registered.some(function(e) {
            return e === name;
        });
        if (contains) {
            return register("_".concat(name));
        } else {
            registered.push(name);
            return name;
        }
    };

    exports =  {
        "register": register,
        "get": function(){ return registered},
        "reset": function(){ registered = config["predefined_contracts"];}
    };

    return exports;
})();

/***
 * Class that takes care of scopes.
 * Core functions are entering (enter_scope()) or exiting scope (exit_scope())
 * As well as either registering in a scope, or doing a lookup in a scope.
 */
export class Scope {

    static top_level = 0;

    static getTopLevelScope() {
        return toplevel_scope;
    }

    static getScope(identifier) {
        return scope_map.get(identifier.toString());
    }

    private registered_frame : Object;
    private parent : Scope;
    private frame : Array<String>;

    constructor(public level) {
        this.frame = [];
        this.registered_frame = {};
        this.parent = null;
    }

    public enter_scope() {
        var new_scope = new Scope(this.level + 1);
        new_scope.parent = this;
        return new_scope;
    }

    public exit_scope() {
        if (this.parent != null) {
            return this.parent;
        }
        throw new Error("Cannot exit toplevel scope!");
    }

    /**
     * identifier is toString() because arrays are compared by reference whilst strings aren't
     * We don't want comparison by reference because they won't be the same
     * @param name of the variable registered
     * @param identifier, the object that will be passed to retrieve the scope
     */
    public register(name, identifier) {
        var registered = registerUtils.register(name);
        scope_map.set(identifier.toString(), this);
        this.registered_frame[name] = registered;
        this.frame.push(name);
    }

    public lookup(item) {
        var i, splitted, current;
        if (typeof item === "undefined") {
            return false;
        }
        splitted = item.split(".");
        if (splitted.length > 1) {
            //todo: what if dotted scope?
        } else {
            for (i = 0; i < this.frame.length; i ++) {
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
    }
}

export module utils {

    export var getRegisteredVariables = registerUtils.get;
    export var registerVariable = registerUtils.register;
    //possibly only useful for tests
    export var resetRegisteredVariables = registerUtils.reset;
}
/***
 * Walks the tree and builds the scope.
 * The scope is put in a Map, and the keys are the range of the associated object.
 * Scopes resolve around Modules and only modules can enter new scope levels.
 * Any type that can be a "type" is tracked here. These are
 * Modules, Classes and Interfaces
 * @param src
 * @returns {Scope}
 */
export function walk(src) {
    //initialisation of the scope
    toplevel_scope = new Scope(Scope.top_level);
    current_scope = toplevel_scope;

    var tree = parse(src, {"range": true});
    walk(tree);

    function walkModule(tree) {
        var name, internal_name, external_name;
        for (var i = 0; i < tree.body.length; i ++ ){
            var node = tree.body[i];
            if (ast.isModuleMember(node)) {
                node = node.typeDeclaration;
                if (ast.isClass(node)) {
                    current_scope.register(node.id.name, node.range);
                } else if (ast.isInterface(node)) {
                    current_scope.register(node.name.name, node.range);
                } else if (ast.isModule(node)) {
                    external_name = node.id.value;
                    internal_name = node.id.name;
                    name = typeof external_name === 'undefined' ? internal_name : external_name;
                    current_scope.register(name, node.range);
                    current_scope = current_scope.enter_scope();
                    walkModule(node);
                }
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

        for (var i = 0; i < tree.body.length; i ++ ) {
            node = tree.body[i];
            if (ast.isModule(node)) {
                externalname = node.id.value;
                internalname = node.id.name;
                name = typeof externalname === 'undefined' ? internalname : externalname;
                current_scope.register(name, node.range);
                current_scope = current_scope.enter_scope();
                walkModule(node);
            }
            else if (ast.isClass(node)) {
                var name = node.id.name;
                current_scope.register(name, node.range);
            }
            else if (ast.isInterface(node)) {
                var name = node.name.name;
                current_scope.register(name, node.range);
            }
        }
    }
    return toplevel_scope;
};