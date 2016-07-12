// https://github.com/shelljs/shelljs
require('shelljs/global')
var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var ENV_CONFIG_MAP={
  development:'./webpack.dev.conf',
  production:'./webpack.prod.conf'
}
var webpackConfig = require(ENV_CONFIG_MAP[process.env.NODE_ENV]||'./webpack.dev.conf')

var spinner = ora('building for '+process.env.NODE_ENV+'...')
spinner.start()

var assetsPath = path.join(config.assetsRoot, config.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
