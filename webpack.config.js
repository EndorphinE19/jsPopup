var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, '/')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js|php$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  },
  watch:true,
  devtool: 'source-map'
};
