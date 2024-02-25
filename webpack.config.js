const path = require('path');

module.exports = {
  entry: './src/index.ts',  // basically the same as our srcDir in tsconfig.json
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  // basically the same as our outDir in tsconfig.json
  },
};