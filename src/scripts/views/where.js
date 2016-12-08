var str = require('../tpls/where.string');


$('body').html(str);

$.ajax({
  url:'/dayfruit/api/city',
    success: function (res) {
        var html = template('list', res);
        $("#city_scroll").html(html);
    }
});

window.onload = function () {
  var myScroll = new IScroll('#city_scroll', {
      probeType: 3,
      mouseWheel: true
  });
  $('#city_scroll ul li').on("tap",function(){
      console.log($(this).html());
      localStorage.setItem("get-city",$(this).html());
      window.location.href="where2.html";
  })

  var str=localStorage.getItem("city");
  if(str==null){
     $(".where div").html("北京");
 }else {
     $(".where div").html(str);
 }
  }
