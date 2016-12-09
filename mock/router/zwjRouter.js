var fs = require('fs');
var url = require('url');
var path = require('path');

module.exports = function(req,res,next){
  var urlObj = url.parse(req.url,true);
    switch (urlObj.pathname) {
      case　'/dist/api/city':
          res.setHeader('Content-Type',"application/json");
          fs.readFile('./mock/city1.json',function(err,data){
              res.end(data);
          });
          return;
      case　'/dist/api/city2':
          res.setHeader('Content-Type',"application/json");
          fs.readFile('./mock/city_list.json',function(err,data){
              res.end(data);
          });
          return;
      case　'/dist/api/place':
           res.setHeader('Content-Type',"application/json");
           fs.readFile('./mock/place.json',function(err,data){
               res.end(data);
           });
           return;
    }
    next();
}
