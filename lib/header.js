var root, C;
root = this;
if (typeof require === 'function' && typeof require.amd === 'undefined') {
	C = require('contracts-js');
} else {
	C = root['contracts-js'];
}


