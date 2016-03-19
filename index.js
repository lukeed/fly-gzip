var zlib = require('zlib');
var assign = require('object-assign');

module.exports = function () {
  var self = this;

  self.filter('gzip', function (data, options) {
    options = assign({}, defaults, options || {});
    return self.defer(compile.bind(self))(source, options);
  });
};

function compile(src, opts, cb) {
  var self = this;

  console.log(src);
}
