# fly-gzip [![][travis-badge]][travis-link] [![npm package][npm-ver-link]][releases]

> Gzip plugin for Fly.

<!-- <div align="center">
	<a href="http://github.com/flyjs/fly">
		<img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
	</a>
</div> -->

## Install

```
npm install --save-dev fly-gzip
```

## Usage

```js
exports.gzip = function * () {
  yield this.source('dist/**/*.*')
    .gzip({
      threshold: 1024,
      ext: 'gzip',
      options: {
        level: 9
      }
    })
    .target('dist');
}
```

## API

### .gzip(options)

Any files passed through `.gzip()` will not be affected directly. Instead, a _cloned_ copy will be compressed & have its extension modified. This means your `target` directory will contain the orginal file **and** its gzipped copy.

```
\src
  |- bundle.js
\dist
  |- bundle.js
  |- bundle.js.gz
```

#### ext

Type: `string`<br>
Default: `gz`

The extension to append to the compressed file's type.

```
bundle.js ===> bundle.js.gz
```

#### threshold

Type: `integer`<br>
Default: `false`

The minimum size, in bytes, required to be compressed. If a file does not satisfy this requirement, it will not be gzipped.

#### options

Type: `object`<br>
Default: `{}`

The [`zlib` options](https://nodejs.org/api/zlib.html#zlib_class_options) to pass in.

## License

MIT © [Luke Edwards](https://lukeed.com)

[releases]:     https://github.com/lukeed/fly-gzip/releases
[npm-ver-link]: https://img.shields.io/npm/v/fly-gzip.svg?style=flat-square
[travis-link]:  https://travis-ci.org/lukeed/fly-gzip
[travis-badge]: http://img.shields.io/travis/lukeed/fly-gzip.svg?style=flat-square
