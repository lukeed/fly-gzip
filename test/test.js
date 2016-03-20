var test = require('tape').test;
var gzip = require('../');

test('fly-gzip', function (t) {
	var input = new Buffer('Hello World');

	gzip.call({
		defer: function (fn) {
			return function (value, options) {
				return new Promise(function (resolve, reject) {
					var cb = function (err, value) {
						return err ? reject(err) : resolve(value)
					}

					fn(value, options || cb, options && cb)
				})
			}
		},
		filter: function (name, fn) {
			t.plan(4);

			t.equal(name, 'gzip', 'add the fly-gzip filter');

			fn(input).then(function (buf) {
				t.equal(buf.ext, '.gz', 'add gz extension by default');
			});

			fn(input, {extension: '.gzip'}).then(function (buf) {
				t.equal(buf.ext, '.gzip', 'add custom gzip extension');
			});

			fn(input, {threshold: 5000}).then(function (buf) {
				t.equal(buf.ext, '', 'will not process if below threshold');
			});
		}
	});
});
