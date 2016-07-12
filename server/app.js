var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var config=require('../config')
var staticPath = path.posix.join(config.assetsPublicPath, config.assetsSubDirectory)
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout')

// middlewares setup
if(app.get('env')==='development') {
  app.use(logger('dev'));

  var webpack = require('webpack');
  var webpackConfig = require('../tools/webpack.dev.conf');
  var compiler = webpack(webpackConfig);

  app.use(require('connect-history-api-fallback')({
    index:'/'
  }))
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    lazy:false,
    // noInfo:true,
    stats: {
      colors: true,
      chunks: false
    }
  }))
  app.use(require('webpack-hot-middleware')(compiler,{
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }))

  app.use(staticPath, express.static('./static'))
}
else{
  var FileStreamRotator = require('file-stream-rotator');
  var compression = require('compression')
  var logDirectory = __dirname + '/logs';
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
  })
  app.use(compression());
  app.use(logger('combined', {stream: accessLogStream}));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('*',function(req,res,next){
  if(app.get('env')=='development'){
    console.log('>>>>>:',req.baseUrl);
  }
  res.locals.title='Vue webpack';
  res.locals.description='Vue webpack web';
  next();
})


//install hashed assets middleware
app.use(require('./middlewares/hashedAssets')(path.resolve(__dirname,'../config/webpack-assets.json')));

app.use('/',routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
