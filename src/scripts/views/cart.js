var str = require('../tpls/cart.string');
var itemStr = require('../tpls/cart-item.string');

require('../utils/common.util.js');

$('body').html(str);

$.ajax({
  url: '/dayfruit/get/userCart?id=18359928622',
  success: function (res) {
    if (res.length <= 0) {
      $('.blank-cart').show();
      $('.goodList').hide();
    }else {
      var s = '';
      for(var i = 0; i < res.length; i++) {
        var compile = template.compile(itemStr);
        var htmlStr = compile(res[i]);
        s += htmlStr;
      }
      $('.cart-item').append(s);
    }

    init();
  }
});

function init() {
  var scroll = new IScroll('.content', {
    mouseWheel: true,
    probeType: 3
  });

  picLazyLoad({
    parent: 'left',
    className: "thumbnail",
    callback: function(me){
      $(me).css('opacity', 0);
      $(me).fadeIn();
    }
  });

  $('.item-info').on('tap', function(event) {
    var $target = $(event.target);
    if($target.hasClass('btn')) {
      var $input = $target.siblings('input');
      var count = parseInt($input.val());
      if($target.html() === '+') {
        count++;
      }
      if($target.html() === '-') {
        count = count === 1? 1: --count;
      }
      $input.val(count);
    }else if($target.hasClass('fdayicon')) {
      $.dialog({
        content : '是否删除？',
        title : 'alert',
        ok : function() {

        },
        cancel : function() {

        },
        lock : true
      });
    }else {
      var id = $(this).attr('data-id');
      var url = 'http://localhost:8090/detail.html?id='+id;
      location.href = url;
    }
  });



  // pullToRefresh(scroll, {
  //   pullToRefresh: false,
  //   dragToLoad: true,
  //   scrollFoot: '.scroll-foot',
  //   loadCallBack: function($foot) {
  //     $.ajax({
  //       url: '/get/detailEnval?id=6271',
  //       success: function(res) {
  //         loadEnvaluation(function() {
  //           $foot.stopLoad();
  //         });
  //       }
  //     });
  //   }
  // });
}
