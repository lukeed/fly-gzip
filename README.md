<div align="center">
	<a href="http://github.com/flyjs/fly">
		<img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
	</a>
</div>

> Gzip plugin for Fly.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]

## Usage
> Check out the [documentation](PLUGIN_DOCUMENTATION) to see the available options.

## Install

```a
npm install -D fly-gzip
```

## Usage

```js
exports.gzip = function * () {
	yield this.source('dist/**/*.*')
		.gzip({
			extension: '.gzip',
			threshold: 1024,
			options: {
				level: 9
			}
		})
		.target('dist');
}
```

## API

#### extension

Type: `string` or `false`<br>
Default: `.gz`

The extension, if any, to append to the filename.

#### threshold

Type: `integer` or `false`<br>
Default: `false`

The minimum size, in bytes, required to gzipped.

#### options

Type: `object`<br>
Default: `{}`

The `zlib` options to pass in. See [zlib's documentation](https://nodejs.org/api/zlib.html#zlib_class_options) for more.

## License

MIT © [Luke Edwards](https://lukeed.com)

[contributors]: https://github.com/lukeed/fly-gzip/graphs/contributors
[releases]:     https://github.com/lukeed/fly-gzip/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-gzip
[npm-ver-link]: https://img.shields.io/npm/v/fly-gzip.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-gzip.svg?style=flat-square
[travis-link]:  https://travis-ci.org/lukeed/fly-gzip
[travis-badge]: http://img.shields.io/travis/lukeed/fly-gzip.svg?style=flat-square
