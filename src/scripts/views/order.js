var ordertpl = require('../tpls/order.string');
$("body").html(ordertpl);

$("#m-home").on("tap",function(){
  location.href = 'index.html';
})
