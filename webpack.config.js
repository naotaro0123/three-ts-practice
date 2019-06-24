const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    watchContentBase: true,
    port: 3000,
    open: true,
    openPage: './index.html'
  }
};
