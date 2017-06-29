# Usage With webpack 3.x

**Important**: as at webpack 3.0.0, tree-shaking is not removing all unused imports.
See [webpack issue #2867](https://github.com/webpack/webpack/issues/2867)

See [example.js](./example.js), [fp.js](./fp.js) and [misc.js](./misc.js) for source code examples.

See [package.json scripts](./package.json) for CLI usage.

## Build Example

```sh
yarn
yarn build
```

See ./dist for output.

## Minimal Build Size

You can see minimal build size (when just a single function is used):

| Version             | Size    |
|---------------------|---------|
| `addDays` (minimal) | 1.39 kB |
| `format` (popular)  | 4.22 kB |
| Tree-shaking        | 9.5 kB  |
