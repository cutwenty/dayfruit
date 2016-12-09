var str = require('../tpls/detail.string');
var envalStr = require('../tpls/detail-envaluation.string');

require('../utils/common.util.js');


$.ajax({
  url: '/dayfruit/api/goodDetails?id=6271',
  success: function (res) {
    var compile = template.compile(str);
    var html = compile(res);
    $('body').html(html);
    init();
  }
});

function init() {
  // 触发滚动
  var scroll = new IScroll('.content', {
    mouseWheel: true,
    probeType: 3
  });
  $('.detail-imgs').on('load', function() {
    scroll.refresh();
  });

  scroll.on('scroll', function() {
    var contentHeight = $('.content').height();
    if(Math.abs(scroll.y) > contentHeight) {
      $('.move-top').show();
    }else {
      $('.move-top').hide();
    }
  });

  pullToRefresh(scroll, {
    pullToRefresh: false,
    dragToLoad: true,
    scrollFoot: '.scroll-foot',
    loadCallBack: function($foot) {
      $.ajax({
        url: '/dayfruit/api/detailEnval?id=6271',
        success: function(res) {
          loadEnvaluation(function() {
            $foot.stopLoad();
          });
        }
      });
    }
  });
  scroll.pullOptions.dragToLoad = false;

  // swiper，显示分页器、自动播放
  new Swiper('.banner', {
    pagination : '.swiper-pagination',
    autoplay: 3000,
    autoplayDisableOnInteraction:false,
    loop: true
  });

  // TODO
  // 可以添加滚动到图片快出现时，加载图片
  picLazyLoad({
    parent: 'tab-imgs',
    className: "detail-imgs",
    threshold: 100,
    callback: function(me){
      $(me).css('opacity', 0);
      $(me).fadeIn();
    }
  });

  // 切换详细信息，和用户评价
  $('.nav-tab li').on('tap', function() {
    // active选项卡
    $(this).find('a').addClass('active');
    $(this).siblings().find('a').removeClass('active');

    // 切换显示详细信息，和用户评价
    var $show = $($('.tab-detail').children()[$(this).index()]);
    $show.css({'display': 'block'}).siblings().css({'display': 'none'});
    if ($(this).index() === 1) {
      $('.scroll-foot').show();
      scroll.pullOptions.dragToLoad = true;
    } else {
      $('.scroll-foot').hide();
      scroll.pullOptions.dragToLoad = false;
    }

    // 用户评价第一次打开要加载
    if($show.hasClass('tab-envaluation') && $show.find('.envaluation-list').children().length == 0) {
      $('.scroll-foot').hide();
      loadEnvaluation(function() {
        scroll.refresh();
        if(scroll.maxScrollY < 0) {
          $('.scroll-foot').show();
        }
      });
      $('.envaluation-list').on('tap', '.envaluation-img', function() {
        // var index = $(this).index();
        var $mask = $('<div class="mask"></div>');
        $mask.on('tap', function() {
          $(this).fadeOut(function() {
            $mask.remove();
          });
        });

        var $img = $(this).clone(false);
        // var $anoImg = $(this).clone(false);

        $img.css({
          'left': $(this).offset().left,
          'top': $(this).offset().top,
          'width': $(this).width(),
          'height': $(this).height()
        });
        // $anoImg.hide();

        $mask.append($img);
        // $mask.append($anoImg);
        $(document.body).append($mask);
        async(function() {
          $img.css({
            'width': '80%',
            'height': 'auto',
            'left': '10%',
            'top': '50%',
            'transform': 'translateY(-50%)'
          });
        });

        // $mask.on('swipeLeft', function() {
        //   console.log(getOtherImg('next'));
        // });
        // $mask.on('swipeRight', function() {

        // });
        // function getOtherImg(get) {
        //   var $newImg = $img[get]();
        //   if ($newImg.length === 0) {
        //     $newImg = $envalImg[get]();

        //   }
        //   return $newImg;
        // }
      });
    }else {
      scroll.refresh();
    }
  });

  $('.select-items .items span').on('tap', function() {
    var count = parseInt($('.select-items .items input').val());
    if($(this).html() === '+') {
      count++;
    }
    if($(this).html() === '-') {
      count = count === 1? 1: --count;
    }
    $('.select-items .items input').val(count);
  });


  $('.move-top').on('tap', function() {
    scroll.scrollTo(0, 0, 500);
  });

  console.log($('.add-cart'));
  $('.add-cart').on('tap', function() {
    $.dialog({
      content : '商品已成功加入购物车',
      title : 'ok',
      time: 2000,
      lock : false
    });
  });
  $('.buy-btn').on('tap', function() {
    var url = '/dayfruit/cart.html';
    location.href = url;
  });
}

function loadEnvaluation(fn) {
  $.ajax({
    url: '/dayfruit/api/detailEnval?id=6271',
    success: function(res) {
      $('.envaluation-list').append(createEnvaluations(res));
      async(function() {
        picLazyLoad({
          parent: 'envaluation-shows',
          className: "envaluation-img",
          callback: function(me){
            $(me).css('opacity', 0);
            $(me).fadeIn();
          }
        });
      });

      fn();
    }
  });
}
function createEnvaluations(data) {
  var str = '';
  for(var i = 0; i < data.length; i++) {
    var eStr = envalStr;
    for(var j = 0; j < data[i].star; j++) {
      eStr = eStr.replace(/fdayicon-star-empty/, 'fdayicon-star-full');
    }
    var compile = template.compile(eStr);
    var htmlStr = compile(data[i]);
    str += htmlStr;
  }
  return str;
}
function async(func) {
  setTimeout(function() {
    func();
  }, 10);
}

module.exports = {
  scrollContent: scroll
};
