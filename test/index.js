'use strict';

const unzip = require('zlib').gunzipSync;
const join = require('path').join;
const test = require('tape').test;
const Fly = require('fly');

const tmp = join(__dirname, 'tmp');
const file = join(__dirname, 'a.txt');

test('fly-gzip', t => {
	t.plan(6);

	const fly = new Fly({
		plugins: [{
			func: require('../')
		}],
		tasks: {
			a: function * () {
				yield this.source(file).gzip().target(tmp);

				const arr = yield this.$.expand(`${tmp}/*.*`);
				const str = yield this.$.read(`${tmp}/a.txt.gz`);
				t.equal(arr.length, 2, 'create two files');
				t.ok(str, 'use default `gz` extension');
				t.equal(unzip(str).toString(), 'Hello world!\n', 'can decompress the file correctly');

				yield this.clear(tmp);
			},
			b: function * () {
				yield this.source(file).gzip({threshold: 1024}).target(tmp);
				const arr = yield this.$.expand(`${tmp}/*.*`);
				t.equal(arr.length, 1, 'do not use `gzip` if file is too small');
				yield this.clear(tmp);
			},
			c: function * () {
				yield this.source(file).gzip({ext: 'fake'}).target(tmp);
				const arr = yield this.$.expand(`${tmp}/*.fake`);
				t.equal(arr.length, 1, 'pass a custom extension');
				yield this.clear(tmp);
			}
		}
	});

	t.ok('gzip' in fly, 'attach `gzip` function to Fly');

	fly.serial(['a', 'b', 'c']);
});
