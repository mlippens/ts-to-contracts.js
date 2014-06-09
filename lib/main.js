var argv, fs, path, lib, transform, beautify, config, tmpl;
fs = require('fs');
path = require('path');
tmpl = require('./utils');
config = require('./config');
lib = path.join(path.dirname(fs.realpathSync(__filename)), '.');
transform = require('./transform');
beautify = require('js-beautify');

argv = require('yargs')
            .usage('Usage: $0 [file.ts] -m [modulename]? -loader [amd|node]?')
            .argv;

exports.run = function() {
    var infile, file, out, output, outfile, vars, module, predefined, opts;
    infile = argv._[0];
    file = fs.readFileSync(infile, "utf8");
    if (argv.m) {
        out = transform.toContracts(file, argv.m);
    } else {
        out = transform.toContracts(file);
    }

    vars = tmpl('vars', {"variables": transform.getVars()});
    predefined = fs.readFileSync(config.template_folder + "predefined.js", "utf8");
    opts = {"body": out, "variables": vars, "module" : argv.m, "predefined": predefined};

    if (argv.loader) {
        module = argv.loader;
        if (module === "node") {
            output = tmpl('commonjs', opts);
        } else if (module === "amd") {
            output = tmpl('amd', opts);
        }
    } else {
        /* default to amd modules */
        output = tmpl('amd', opts);
    }

    outfile = infile.split('.')[0] + '.js';
    fs.writeFileSync(outfile, beautify(output), "utf8");
};

