// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

/*TODO: Assign a production public path*/
var publicPath = process.env.NODE_ENV=='production'?'/':'/';

module.exports = {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: publicPath,
    sourceMap: process.env.NODE_ENV!=='production' //do not use source map in production environment
}
