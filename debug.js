/**
 * Created by mello on 4/30/14.
 */
var walk = require('./lib/walk').walk;
var t = require('./lib/transform').toContracts;
var fs = require("fs");

var file = fs.readFileSync("examples/backbone.ts", "utf8");

console.log(t(file));