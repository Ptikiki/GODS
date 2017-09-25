var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./stylesheet/styles.js', './javascript/index.js'],
  },
  output: {
      path: path.resolve(__dirname, './build'),
      filename: 'javascript/bundle.js',
      publicPath: '/',
  },
  devServer: {
      contentBase: path.resolve(__dirname, './src'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   loaders: {
        //     'scss': 'vue-style-loader!css-loader!sass-loader',
        //     'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        //   }
        // }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin
        .extract({
            fallbackLoader: 'style-loader',
            loader: [
                { loader: 'css-loader', query: { modules: false, sourceMaps: true } },
                { loader: 'sass-loader'},
            ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
      new ExtractTextPlugin({
          filename: 'stylesheet/main.css',
          allChunks: true,
      }),
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
