var fs = require('fs');
var url = require('url');
var path = require('path');

module.exports = function(req,res,next){
  var urlObj = url.parse(req.url,true);
    switch (urlObj.pathname) {
      case　'/api/allGoods/liqi':
          res.setHeader('Content-Type',"application/json");
          fs.readFile('./mock/allGoods.json',function(err,data){

              res.end(data);
          });
          return;
    }
    next();
}
