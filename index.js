var gzip = require('zlib').gzip;
var stats = require('fs').statSync;
var assign = require('object-assign');

var defaults = {
	extension: '.gz',
	threshold: false,
	options: {}
};

module.exports = function () {
	var self = this;

	return self.filter('gzip', function (data, config) {
		config = assign({}, defaults, config || {});
		// data = new Buffer('Hello');
		return self.defer(compile.bind(self))(data, config);
	});
};

function compile(buf, config, cb) {
	var self = this;
	var ext = config.file.ext; // eg: '.js'

	// if there is a threshold & we don't exceed it
	if (config.threshold && typeof config.threshold == 'number') {

		if (Buffer.byteLength(buf) < config.threshold) {
			return cb(null, {code: buf, ext: ext});
		}
	}

	// modify the file extension, if set
	if (config.extension && typeof config.extension == 'string') {
		ext += config.extension;
	}

	// run the gzip module, passing in Gzip options
	return gzip(buf, config.options, function (err, res) {
		if (err) {
			return self.emit('plugin_error', {
				plugin: 'fly-gzip',
				error: err.message
			});
		}

		cb(null, {code: res, ext: ext});
	});
}
