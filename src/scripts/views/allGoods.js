var str = require('../tpls/allGoods.string');

var ball=require("../utils/shopCarBall.js");

var common = require('../utils/common.util.js');
$('body').html(str);
/*ball.setBall();*/

var mock=[
    "奇异果","鸡","鱼","蓝莓","国外","蛋", "年糕","梨","红提","脐橙","牛油果","榴莲","火龙果"
]
ajaxGet("no0");
$("aside li").eq(0).css({
    background:"white",
    color:"#64a131",
    width:".82rem",
    zIndex:"1001"
});
function ajaxGet(index) {
    $.ajax({
        url: '/dayfruit/api/allGoods/liqi',
        success: function (res) {
            var html = template('list', res[index]);
            console.log(html);
            $(".goods1").html(html);
        }
    })
}


window.onload=function(){
    $("aside").on("tap","li",function(){
        $(".goods1").html(
           '<script id="list" type="text/html">'+
               '<ul>'+
            '{{each data as value i}}'+
        '<li><a href={{value.url}}><img src={{value.src}}>'+
        '{{value.name}}'+
        '</a>'+
        '</li>'+
        '{{/each}}'+
        '</ul>'+
        '</script>'
        )
        $(this).css({
            background:"white",
            color:"#64a131",
            width:".82rem",
            zIndex:"1010"
        }).siblings().css({
            background:"#f1f1f1",
            color:"black",
            width:"100%"
        });
        console.log("no"+$(this).index());
        ajaxGet("no"+$(this).index());
    })

    $("header input[type=search]").focus(function(){
         $(".diglo").css({
             display:"block"
         })
      //  window.open("https://www.baidu.com",'_self');
        $(".diglo input[type=search]").focus(function(){

        });
    });

    $(".diglo input[type=search]").on("keydown",function(event){
        // window.location.href="http://localhost:8090/listGoods.html";
        // console.log("http://localhost:8090/listGoods.html");
        //window.location.href="https://www.baidu.com";
       // window.location.href="www.baidu.com";
       // window.open("https://www.baidu.com",'_self');

     if(event.keyCode==13){
        console.log($(this).val());
        var str= $(this).val();
        for(var i=0;i<mock.length;i++){
            if(mock[i]==str){
                window.location.href="listGoods.html?"+i;
                console.log($(this).val());
                //console.log("href");
               window.open("listGoods.html?"+i,'_self');
               // window.location.href="listGoods.html?"+i;
            }
        }
         return false;

     }
        //console.log($(this).val());
    })
   $(".headIn span").tap(function(){
       $(".diglo").css({
           display:"none"
       })
   })
    $("header").find(".fdayicon-login").tap(function(){
        if(common.isLogin()){
            window.open("other.html","_self");
        }else{
            window.open("login.html","_self");
        }
    })
}
