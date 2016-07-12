var path = require('path')
var config = require('../config')
var utils = require('./utils')
var SaveHashes = require('assets-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var projectRoot = path.resolve(__dirname, '../')
var webpack=require('webpack');
var env=process.env.NODE_ENV||'development';
module.exports = {
  entry: require('./list-entries')(path.resolve(__dirname,'../public/pages')),
  output:{
    publicPath: config.assetsPublicPath
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.sourceMap,
      extract: true
    })
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    //A directory (or array of directories absolute paths), in which webpack should look for modules that weren’t found in resolve.root or resolve.modulesDirectories.
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {

    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  plugins:[
    new webpack.DefinePlugin({
      '__DEV__':env=='development',
      'process.env': {
        NODE_ENV:JSON.stringify(env)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new SaveHashes({path: path.join(__dirname, '../config')}),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: utils.styleLoaders({ sourceMap: config.sourceMap, extract: true }).concat([
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ])
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
