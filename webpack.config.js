const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'joy.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'joy',           // The global name for the library
    libraryTarget: 'umd',           // Supports both CommonJS and script tags
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production'
};
