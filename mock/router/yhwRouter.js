var fs = require('fs');
var url = require('url');
var path = require('path');


module.exports = function(req, res, next) {
  var urlObj = url.parse(req.url, true);
  switch (urlObj.pathname) {
    case '/dist/api/user':
      res.setHeader('Content-Type', 'application/json');
      fs.readFile('./mock/user.json', function(err, data) {
        console.log(urlObj.pathname);
        res.end(data);
      });
      //...
      return;
    case '/dist/api/reg':
      res.setHeader('Content-Type', 'application/json');
      fs.appendFile('./mock/user.json', "012345", function(err, data) {
            res.end(data);
      });
      //...
      return;
  }
  next();
}
