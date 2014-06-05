/**
 * Created by mello on 5/7/14.
 *
 * This file just gives us back a representation of the nesting in the file
 * (so i.e. with respect to modules.)
 * This is needed because of the fact that falafel always treats it's children first.
 * that way we have no idea of knowing where we are.
 */
declare function require(name: string);
var parse = require('esprima').parse;

var scope_map = new WeakMap();
var registeredVariables = [];

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


var register_variable = (()=> {

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

    return calc;
})();

var toplevel_scope, current_scope;

export class Scope {

    static top_level = 0;

    static getTopLevelScope() {
        return toplevel_scope;
    }

    static getScopeMap() {
        return scope_map;
    }

    private registered_frame : Object;
    private parent : Scope;
    private frame : Array<String>;

    constructor(public level) {
        this.frame = [];
        this.registered_frame = {};
        this.parent = null;
    }

    enter_scope() {
        var new_scope = new Scope(this.level + 1);
        new_scope.parent = this;
        return new_scope;
    }

    exit_scope() {
        if (this.parent != null) {
            return this.parent;
        }
        throw new Error("Cannot exit toplevel scope!");
    }

    register(name, identifier) {
        var registered = register_variable(name);
        scope_map.set(identifier, this);
        this.registered_frame[name] = registered;
        this.frame.push(name);
    }

    lookup(item) {
        var i, splitted, current;
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
toplevel_scope = new Scope(Scope.top_level);
current_scope = toplevel_scope;

export module Utils {

    export function isModuleMember(node) {
        return node.type === "ModuleMember";
    }

    export function isInterface(node) {
        return node.type === "InterfaceDeclaration";
    }

    export function isModule(node) {
        return node.type === "ModuleDeclaration";
    }

    export function isClass(node) {
        return node.type === "ClassDeclaration";
    }

    export function getRegisteredVariables() {
        return registeredVariables;
    }
    //possibly only useful for tests
    export function resetRegisteredVariables() {
        registeredVariables = [];
    }
}

export function walk(src) {
    var ast = parse(src, {"range": true});
    walk(ast);

    function walkModule(ast) {
        var name, internal_name, external_name;
        for (var i = 0; i < ast.body.length; i ++ ){
            var node = ast.body[i];
            if (Utils.isModuleMember(node)) {
                node = node.typeDeclaration;
                if (Utils.isClass(node)) {
                    current_scope.register(node.id.name, node.range);
                } else if (Utils.isInterface(node)) {
                    current_scope.register(node.name.name, node.range);
                } else if (Utils.isModule(node)) {
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
     * Only considers top-level elements!
     * @param ast
     * @param dict
     */
    function walk(ast) {
        var newscope, node, externalname, internalname, name;

        for (var i = 0; i < ast.body.length; i ++ ) {
            node = ast.body[i];
            if (Utils.isModule(node)) {
                externalname = node.id.value;
                internalname = node.id.name;
                name = typeof externalname === 'undefined' ? internalname : externalname;
                current_scope.register(name, node.range);
                current_scope = current_scope.enter_scope();
                walkModule(node);
            }
            else if (Utils.isClass(node)) {
                var name = node.id.name;
                current_scope.register(name, node.range);
            }
            else if (Utils.isInterface(node)) {
                var name = node.name.name;
                current_scope.register(name, node.range);
            }
        }
    }
    return current_scope;
};