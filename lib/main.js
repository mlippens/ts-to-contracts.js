var fs = require('fs');
var path = require('path');
var lib = path.join(path.dirname(fs.realpathSync(__filename)), '.');
var transform = require('./transform');
var beautify = require('js-beautify');

var argv = require('yargs')
            .usage('Usage: $0 [file.ts]')
            .argv;

exports.run = function() {
    var infile = argv._[0];
    var file = fs.readFileSync(infile, "utf8");
    var header = fs.readFileSync("lib/header.js", "utf8");
    var out = transform.toContracts(file);
    var outfile = infile.split('.')[0] + '.js';
    fs.writeFileSync(outfile, beautify(header + out), "utf8");
}

