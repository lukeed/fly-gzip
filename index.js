var gzip = require('zlib').gzip;
var extname = require('path').extname;
var assign = require('object-assign');

var defaults = {
  extension: '.gz',
  options: {}
};

module.exports = function () {
  var self = this;

  return self.filter('gzip', function (data, config) {
    config = assign({}, defaults, config || {});
    return self.defer(compile.bind(self))(data, config);
  });
};

function compile(buf, config, cb) {
  var self = this;

  var ext = extname(config.filename);
  // modify the file extension, if set
  var cext = config.extension;
  if (cext && typeof cext == 'string') {
    ext += cext;
  }

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
