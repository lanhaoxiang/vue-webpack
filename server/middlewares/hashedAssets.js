var fs = require('fs');

module.exports = function(jsonPath) {
  return function(req, res, next) {
    res.locals.__assets = JSON.parse(fs.readFileSync(jsonPath))
    next();
  }
}
