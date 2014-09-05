/**
* Created by mello on 6/8/14.
*/
var scope = require('./scope');

var config = require('./config');
var Scope = scope.Scope;

var current;
(function (_current) {
    var current;
    var name;

    function set(c, n) {
        current = c;
        name = n;
    }
    _current.set = set;

    function get() {
        return current;
    }
    _current.get = get;

    function lookup(varname) {
        //for self contracts: we are referring to the name of the entity itsself
        if (name != null && name === varname) {
            return config["contracts_prefix"] + "Self";
        }
        if (current != null && typeof current.range !== "undefined") {
            try  {
                return Scope.getScope(current.range).lookup(varname);
            } catch (e) {
                throw new Error(current.range + " is not in scope, and is trying to find variable named: " + varname);
            }
        }
        return false;
    }
    _current.lookup = lookup;
})(current || (current = {}));

module.exports = current;
//# sourceMappingURL=current.js.map
