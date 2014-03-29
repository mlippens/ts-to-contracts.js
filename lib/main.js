var argv, fs, path, lib, transform, beautify;
fs = require('fs');
path = require('path');
lib = path.join(path.dirname(fs.realpathSync(__filename)), '.');
transform = require('./transform');
beautify = require('js-beautify');

argv = require('yargs')
            .usage('Usage: $0 [file.ts] -m [modulename]?')
            .argv;

exports.run = function() {
    var infile, file, header, footer, out, outfile;
    infile = argv._[0];
    file = fs.readFileSync(infile, "utf8");
    header = fs.readFileSync("lib/header.js", "utf8");
    footer = fs.readFileSync("lib/footer.js", "utf8");
    if (argv.m) {
        out = transform.toContracts(file, argv.m);
    } else {
        out = transform.toContracts(file);
    }
    outfile = infile.split('.')[0] + '.js';
    fs.writeFileSync(outfile, beautify(header + out + footer), "utf8");
}

