var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('page/index', {
        title:'Vue webpack',
        description:'This is a site using Vue.js with webpack'
      });
});

module.exports = router;
