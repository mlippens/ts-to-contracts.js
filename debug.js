/**
 * Created by mello on 4/30/14.
 */
var t = require('./lib/transform').toContracts;
var fs = require("fs");

var file = fs.readFileSync("examples/overloads.ts", "utf8");

t(file);