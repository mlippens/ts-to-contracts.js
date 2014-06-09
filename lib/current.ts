/**
 * Created by mello on 6/8/14.
 */

import scope = require('./scope');
var Scope = scope.Scope;

module current {

    var current;

    export function set(c) {
        current = c;
    }

    export function get() {
        return current;
    }

    export function lookup(name) {
        if (current != null && typeof current.range !== "undefined") {
            return Scope.getScope(current.range).lookup(name);
        }
        return false;
    }
}

export = current;