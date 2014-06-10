/**
 * Created by mello on 6/8/14.
 */

import scope = require('./scope');
declare function require(mod: String);
var config = require('./config');
var Scope = scope.Scope;

module current {

    var current;
    var name;

    export function set(c, n) {
        current = c;
        name = n;
    }

    export function get() {
        return current;
    }

    export function lookup(varname) {
        //for self contracts: we are referring to the name of the entity itsself
        if (name != null && name === varname) {
            return config["contracts_prefix"] + "Self";
        }
        if (current != null && typeof current.range !== "undefined") {
            return Scope.getScope(current.range).lookup(varname);
        }
        return false;
    }
}

export = current;