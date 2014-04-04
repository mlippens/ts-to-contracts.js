tmpl = require('./microtemplating').tmpl
fs = require('fs')


file = fs.readFileSync('templates/ambientclass.js', 'utf8')

console.log file
res = tmpl file, className: "annelies"

console.log res