/**
 * Created by mello on 4/8/14.
 */
var fs, config, tmpl;
fs = require('fs');
config = require('./config');
tmpl = require('./microtemplating').tmpl;

/**
 * Merging option objects. Behaviour is to overwrite existing properties.
 * @param obj
 * @returns {{}}
 */
var mergeOpts = function(obj){
    var name, extended, f;
    extended = {};
    f = function(o) {
        for(name in o) {
            if(o.hasOwnProperty(name)) {
                extended[name] = o[name];
            }
        }
    };
    f(config);
    f(obj);
    return extended;
};

/**
 * shim for tmpl of "microtemplating.js"
 * @param templateName
 * @param opts
 * @returns {*}
 */
var templatify = function(templateName, opts) {
    var splitName, template;
    splitName = templateName.split(".");
    if (splitName.length === 1) {
        templateName = templateName + ".template";
    }
    template = fs.readFileSync(config.template_folder + templateName, "utf8");
    opts = mergeOpts(opts);
    return tmpl(template, opts);
};

module.exports = templatify;