require('harmony-reflect');
var __contracts = require('contracts-js');

var A, SubContractedA, contractedA, subContractedA,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

A = (function() {

    function A() {}

    return A;

})();

contractedA = __contracts.guard(__contracts.object({
    prototype: __contracts.object({}, {})
}, {}),A);

SubContractedA = (function(_super) {

    __extends(SubContractedA, _super);

    function SubContractedA() {
        return SubContractedA.__super__.constructor.apply(this, arguments);
    }

    return SubContractedA;

})(contractedA);

subContractedA = new SubContractedA();

alert("We instantiated an object of contractedA.");

alert("is the instance an instance of Backbone.Model?=> " + (subContractedA instanceof A));

