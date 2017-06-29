# Usage With webpack 1.x

See [example.js](./example.js), [fp.js](./fp.js) and [misc.js](./misc.js) for source code examples.

See [package.json scripts](./package.json) for CLI usage.

## Build Example

```sh
yarn
yarn run build
```

See ./dist for output.

## Minimal Build Size

You can see minimal build size (when just a single function is used):

| Version             | Size    |
|---------------------|---------|
| `addDays` (minimal) | 1.34 kB |
| `format` (popular)  | 4.29 kB |
