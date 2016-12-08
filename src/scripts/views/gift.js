var gifttpl = require('../tpls/gift.string');
$("body").html(gifttpl);

$("#m-home").on('tap',function(){
  location.href = "index.html";
})
