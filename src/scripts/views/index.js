var str = require('../tpls/index.string');
//广告
var advertisement = require('../tpls/advertisement.string');


var common = require('../utils/common.util.js');

$('body').html(str + advertisement);

init();
function init(){
  // 轮播图
  $.ajax({
    url:"/dayfruit/api/index/bannerList",
    success:function(data){
      var html = template('banner',data);
      $('#w-index-sec').prepend(html);
      setTimeout(function () {
        initBanner();
      }, 50);
    }
  })

  //首页列表
  $.ajax({
    url:'/dayfruit/api/index/listData',
    success:function(data){
      var html = template('list',data);
      $("#w-list-box").html(html);
      setTimeout(function () {
        initScroll();
      }, 50);
    }
  });
}
//获取当前位置
function position(){
  var city = window.localStorage.getItem('city');
  if(city){
    $('.curr-region-name').html(city);
  }else{
    $('.curr-region-name').html('北京');
  }

}
//广告
function advertise(){
  require('../utils/advertisement.js');
}
var initBanner = function () {
  var indexSwiper = new Swiper('.index-banner',{
    pagination:'.index-pagination',
    paginationClickable:true,
    autoplay:5000,
    autoplayDisableOnInteraction:false,
    loop:true
  });

};
var initScroll = function(){

  nextPage();//页面之间的切换
  position();//获取当前位置
  advertise();//添加广告事件

  $('#fresh-head').css('display', 'block');
  $('#fresh-foot').css('display', 'block');

  var indexScroll = new IScroll('#w-index-scroll',{
    probeType:3,
    mouseWheel:true,
    preventDefault:false//默认事件打开,a标签的点击事件有效.
  });

  pullToRefresh(indexScroll, {
    pullToRefresh: true,
    dragToLoad: true,
    scrollHead: '#fresh-head',
    scrollFoot: '#fresh-foot',
    refreshCallBack: function ($head) {
      $.ajax({
        url:"/dayfruit/api/index/freshList",
        success:function(data){

          if(data!=null && data!=undefined){
            var html = template('list',data);
            $("#w-list-box").find("ul.index-list").prepend(html);
          }else{
            // 没有数据可更新
          }
          indexScroll.refresh();
          $head.stopRefresh();
        }
      });
    },
    loadCallBack: function($foot) {
      $.ajax({
        url:"/dayfruit/api/index/loadedList",
        success:function(data){
          if(data!=null && data!=undefined){
            var html = template('list',data);
            $("#w-list-box").find("ul.index-list").append(html);
          }else{
            //没有数据可加载
          }
          indexScroll.refresh();
          $foot.stopLoad();
        }
      });
    }
  });


  //   var $head = $("#fresh-head");
  //   var freshHeight = parseInt($head.css('height'));
  //   //内容是否可以滚动
  //   // if(listScroll()){
  //     indexScroll.scrollBy(0,-freshHeight);
  //   // }
  // // 是否刷新
  //   var headimg = $head.find('img');
  //   var isUp = headimg.hasClass('up');
  // // 是否加载
  //   var $foot = $("#fresh-foot");
  //   var footimg = $foot.find('img');
  //   var isDown = headimg.hasClass('down');

  //   indexScroll.on('scroll', function () {


  //       var y = this.y;
  //       var maxY = this.maxScrollY - y;

  //       //下拉刷新箭头旋转
  //       if (y >= 0) {
  //         // $("#fresh-head").css('display','block');
  //         !isUp && headimg.addClass('up');
  //         return '';
  //       }
  //       if (maxY >= 0) {//上拉加载箭头旋转
  //         // $("#fresh-foot").css('display','block');
  //         !isDown && footimg.addClass('down');
  //         return '';
  //       }
  //       if(y<=-500){
  //         $('.w-component-float').addClass('active');
  //       }else{
  //         $('.w-component-float').removeClass('active');

  //       }
  //   });
  $('#goToTop').on('tap',function(){
    indexScroll.scrollTo(0,-freshHeight,300,IScroll.utils.ease.circular);
    $('.w-component-float').removeClass('active');
  });
  //   indexScroll.on('scrollEnd',function(){
  //     // 未滑到顶部，操作无效

  //     if (this.y >= -freshHeight && this.y < 0) {
  //         indexScroll.scrollTo(0, -freshHeight);
  //         headimg.removeClass('up');
  //     } else if (this.y >= 0) {

  //       //下拉刷新数据
  //       headimg.attr('src', '/dayfruit/images/wang/ajax-loader.gif');
  //       $.ajax({
  //         url:"/dayfruit/api/index/freshList",
  //         success:function(data){

  //           if(data!=null && data!=undefined){
  //             var html = template('list',data);
  //             $("#w-list-box").find("ul.index-list").prepend(html);
  //           }else{
  //             // 没有数据可更新
  //           }
  //           indexScroll.scrollTo(0,-freshHeight);
  //           headimg.removeClass('up');
  //           headimg.attr('src', '/dayfruit/images/wang/arrow.png');
  //           indexScroll.refresh();
  //         }
  //       });
  //     }
  // // 未滑到底部，操作无效
  //     var maxY = this.maxScrollY - this.y;
  //     if (maxY > -freshHeight && maxY < 0) {
  //         var self = this;
  //         indexScroll.scrollTo(0, self.maxScrollY + freshHeight);
  //         footimg.removeClass('down');

  //     } else if (maxY >= 0) {
  //       //上拉加载数据
  //       footimg.attr('src', '/dayfruit/images/wang/ajax-loader.gif');
  //       var self = this;
  //       $.ajax({
  //         url:"/dayfruit/api/index/loadedList",
  //         success:function(data){
  //           if(data!=null && data!=undefined){
  //             var html = template('list',data);
  //             $("#w-list-box").find("ul.index-list").append(html);
  //           }else{
  //             //没有数据可加载
  //           }
  //           indexScroll.scrollTo(0,self.y + freshHeight);
  //           footimg.removeClass('down');
  //           footimg.attr('src', '/dayfruit/images/wang/arrow.png');
  //           indexScroll.refresh();
  //         }
  //       });
  //     }
  //   });

}

function nextPage(){
  $("#nav-list li").on('tap',function(){
    switch ($(this).index()) {
    case 0:
      if(common.isLogin()){
        window.location.href = "/dayfruit/place.html";
      }else{
        window.location.href = "/dayfruit/login.html";
      }

      break;
    case 1:
      window.location.href = '/dayfruit/allGoods.html';
      break;
    case 2:
      if(common.isLogin()){
        window.location.href = "/dayfruit/order.html";
      }else{
        window.location.href = "/dayfruit/login.html";
      }
      break;
    case 3:
      if(common.isLogin()){
        window.location.href = '/dayfruit/other.html';
      }else{
        window.location.href = "/dayfruit/login.html";
      }
      break;
    default:

    }
  });
}
