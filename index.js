'use strict';

// @todo: promisify
const gzip = require('zlib').gzipSync;

const defaults = {
	threshold: false,
	options: {},
	ext: 'gz'
};

module.exports = function () {
	this.plugin('gzip', {}, function * (file, opts) {
		opts = Object.assign({}, defaults, opts);

		// if there is a threshold && we don't meet it, exit
		if (typeof opts.threshold === 'number' && Buffer.byteLength(file.data) < opts.threshold) {
			return;
		}

		// clone the file object
		// @todo: `opts.replace`
		let clone = Object.assign({}, file);

		// modify the file extension
		clone.base += (opts.ext.charAt(0) === '.') ? opts.ext : `.${opts.ext}`;

		// compress & set data
		clone.data = gzip(clone.data, opts.options);

		// add to files array
		this._.files.push(clone);
	});
};
