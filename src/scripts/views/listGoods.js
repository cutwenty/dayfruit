var str = require('../tpls/listGoods.string');
var ball=require('../utils/shopCarBall');

var common = require('../utils/common.util.js');

$('body').html(str);
/*ball.setBall();*/

var search=parseInt(window.location.search.substring(1));
console.log(search);
var http = require('http');
var url = search;

  var mock=[
      "奇异果","鸡","鱼","蓝莓","国外","蛋", "年糕","梨","红提","脐橙","牛油果","榴莲","火龙果"
  ]
    ajaxGet("list"+search,search);

/*
function beginRandom(){
    var num=Math.floor(Math.random()*13);

    ajaxGet("list"+num,num);
}
*/
function ajaxGet(index,num) {
    $("header ul li").eq(1).html(mock[num]);
    $.ajax({
      url: '/dayfruit/api/allGoods/liqi',
        success: function (res) {
            setDataTolist(res[index]);
        }
    })
}
function setDataTolist(array){
     var length=array.length;
    for(var i=0;i<length;i++){
        var tempList=$(
            '<li><a href="#" data-cook='+i+'&list'+search+'>'+
            '<img src='+array[i].src+'>'+
            '<div class="listDel">'+
            '<p>'+array[i]["h3"]+'</p>'+
            '<p>'+array[i]["h4"]+'</p>'+
        '<p>'+array[i]["h5"]+'</p>'+
        '<i class="fdayicon fdayicon-procart"></i>'+
            '</div></a></li>'
        )
        $(".swiper ul").append(tempList);
        tempList.find("a").tap(function(e){
            if(!$(e.target).hasClass("fdayicon-procart")){
                window.open("detail.html",'_self');
            }
        })
    }
}
window.onload=function(){
    $("header").find(".fdayicon-login").tap(function(){
        if(common.isLogin()){
            window.open("other.html","_self");
        }else{
            window.open("login.html","_self");
        }
    })
    $("header").find(".fdayicon-cart").tap(function(){
        window.open("cart.html","_self");
    })
    if($("section").height()>$(".scrollList").height()){

    }else{

        $(".scrollHead").css({display:"block"});
        $(".scrollF").css({display:"block"});

            var myScroll=new IScroll('.swiper',{
                  probeType:1,
                  mouseWheel:true
              });
            myScroll.scrollTo(0, -35);
            var head=$(".scrollHead img"),
                topImgHasClass=head.hasClass('up');
            var footer=$('.scrollF img'),
                botomImgHasClass=footer.hasClass("down");

            myScroll.on("scroll",function(){
                console.log(this.maxScrollY-this.y);
                var y=this.y,
                    maxY=this.maxScrollY-y;
                if(y>=0){
                    !topImgHasClass&&head.addClass("up");
                    return '';
                }
                if(maxY>=0){
                    !botomImgHasClass&&footer.addClass("down");
                    return '';
                }

            })
            myScroll.on('scrollEnd',function(){
                if(this.y>=-35&&this.y<0){
                    myScroll.scrollTo(0,-35);
                    head.removeClass("up");
                }else if(this.y>=0){
                    head.attr('src','/images/liqi/ajax-loader.gif')

                    setTimeout(function(){
                        myScroll.scrollTo(0,-35);
                        head.removeClass("up");
                        head.attr('src','/images/liqi/arrow.png');
                    },1000);
                }
                var maxY=this.maxScrollY-this.y;
                console.log(maxY);
                if(maxY>-45&&maxY<0){
                    var _this=this;
                    myScroll.scrollTo(0,_this.maxScrollY+35);
                    footer.removeClass("down");
                }else if(maxY>=0){
                    footer.attr("src",'/images/liqi/ajax-loader.gif');
                     var _this=this;
                    setTimeout(function(){
                        $(".scrollList ul").append(
                         '<li> <a href="detail.html"> \
                        <img src="/images/liqi/list2q.jpg"> \
                            <div class="listDel"> \
                            <p>佳沛新西兰绿奇异果(巨无霸)</p> \
                            <p>规格：22个</p> \
                        <p>￥118.00</p> \
                        <i class="fdayicon fdayicon-procart"></i> \
                            </div> \
                            </a></li> \
                            <li><a> \
                            <img src="/images/liqi/list2q.jpg"> \
                            <div class="listDel"> \
                            <p>佳沛新西兰绿奇异果(巨无霸)</p> \
                            <p>规格：22个</p> \
                        <p>￥118.00</p> \
                        <i class="fdayicon fdayicon-procart"></i> \
                            </div></a></li>'
                        )
                        myScroll.refresh();
                         myScroll.scrollTo(0,_this.maxScrollY+35);
                        footer.removeClass("down");
                        footer.attr("src","/images/liqi/arrow.png");
                      /*  myScroll.refresh();*/
                    },1000);

                }
            })

    }



    $(".listDel").on("tap","i",function(e){

           //动画部分
      /*  e.stopPropagation();*/
        var $target=$(this).parents(".listDel").siblings("img");
        var cloneTag=$target.clone(true);

      $(".container").append(cloneTag);
        //$target.parent().prepend(cloneTag);

        var $shopCars=$(".container header .fdayicon-cart");
        var x=$shopCars.offset().left;
        var y=$shopCars.offset().top;
         console.log(x+"##############"+y);
        console.log(cloneTag);
       cloneTag.css({
            zIndex:"999 !important",
           width:".9rem",
           position:"absolute",
            left:$target.offset().left,
            top:$target.offset().top
        })
        var left=x-cloneTag.offset().left-cloneTag.width()/2+"px";
        var top=y-cloneTag.offset().top-cloneTag.height()/2+"px";
         setTimeout(function(){
             cloneTag.remove();
         },1000)
       cloneTag.css({
           opacity:.5,
           transition: "all 1000ms",
           transform: 'translate('+left+', '+top+')  scale(0)'
        })



       //将对应的数据存在localStorage 中












    })

}
