var argv, fs, path, lib, transform, beautify, config, tmpl;
fs = require('fs');
path = require('path');
tmpl = require('./utils');
config = require('./config');
lib = path.join(path.dirname(fs.realpathSync(__filename)), '.');
transform = require('./transform');
beautify = require('js-beautify');

argv = require('yargs')
            .usage('Usage: $0 [file.ts] -m [modulename]?')
            .argv;

exports.run = function() {
    var infile, file, header, footer, out, outfile, variableTemplate, module;
    infile = argv._[0];
    file = fs.readFileSync(infile, "utf8");
    footer = tmpl('footer', {});
    if (argv.m) {
        out = transform.toContracts(file, argv.m);
    } else {
        out = transform.toContracts(file);
    }
    if (argv.module) {
        module = argv.module;
        if (module === "node") {
            //make commonjs module header here!
            header = tmpl('header', {});
        }
    } else {
        /* default to amd modules */
        header = tmpl('header', {});
    }
    variableTemplate = tmpl('vars', {"variables": transform.getVars() });
    outfile = infile.split('.')[0] + '.js';
    fs.writeFileSync(outfile, beautify(header + variableTemplate + out + footer), "utf8");
}

