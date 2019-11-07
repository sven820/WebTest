
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    configureWebpack: {
      devtool: 'source-map',
      resolve: {
        extensions: ['.js', '.vue', '.json', 'ts'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'tslint-loader'
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          },
        ]
      }
    }
  }