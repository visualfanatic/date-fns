var path = require('path')

var config = Object.assign({
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: getOutputConfig(),
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}
    ]
  }
}, entryConfig())

function entryConfig () {
  if (process.env.BUILD_TESTS) {
    return {
      entry: {
        'tests': './testWithoutLocales.js'
      }
    }
  } else if (process.env.NODE_ENV === 'test') {
    return {}
  } else {
    return {
      entry: {
        'date_fns': './tmp/umd/index.js'
      }
    }
  }
}

function getOutputConfig () {
  if (process.env.BUILD_TESTS) {
    return {
      path: path.join(process.cwd(), 'tmp'),
      filename: '[name].js'
    }
  } else if (process.env.NODE_ENV === 'test') {
    return {
      path: '/'
    }
  } else {
    return {
      path: path.join(process.cwd(), 'dist'),
      filename: '[name].js',
      library: 'dateFns',
      libraryTarget: 'umd'
    }
  }
}

module.exports = config
