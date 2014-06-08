/**
 * Created by mello on 4/30/14.
 */
var scope = require('./lib/scope');
var t = require('./lib/transform').toContracts;
var fs = require("fs");

scope.utils.registerVariable("Backbone");

var file = fs.readFileSync("examples/backbone.ts", "utf8");

console.log(t(file));