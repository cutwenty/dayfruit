var abouttpl = require('../tpls/about-us.string');
$("body").html(abouttpl);
$("#m-home").on('tap',function(){
  location.href = 'index.html';
})
