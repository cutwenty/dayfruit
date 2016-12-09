var str = require('../tpls/where2.string');


$('body').html(str);

var str=localStorage.getItem("get-city");
$(".where_city header div").html(str);
$.ajax({
  url:'/dayfruit/api/city2',
    success: function (res) {
        for( city in res){
            if (res[city].name==str){
                console.log(res[city].name);
                var data=res[city].Data;
            }
        }

        var html = template('list', data);
        $("#city_scroll").html(html);
      setTimeout(function () {
        init();
      });
    }
});

var init = function () {
  var myScroll = new IScroll('#city_scroll', {
      probeType: 3,
      mouseWheel: true
  });
  $('#city_scroll ul li').on("tap",function(){
      console.log($(this).html());
      localStorage.setItem("city",localStorage.getItem("get-city"));
      window.location.href="index.html";
  })
  }
