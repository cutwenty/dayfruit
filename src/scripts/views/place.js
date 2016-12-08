var str = require('../tpls/place.string');


$('body').html(str);

var str=localStorage.getItem("city")||"北京";
$.ajax({
  url:'/dayfruit/api/place',
    success: function (res) {
        for( city in res){
            if (res[city].name==str){
                var data=res[city].Data;
            }
        }
        if(data){
            var html = template('list', data);
            $("#city_scroll").html(html);
        }else {
            $("#city_scroll")[0].style.background="url('/images/zong/noservice.svg') no-repeat center 20%";
        }
    },
    complete:function(){
        $('#city_scroll ul li').on("tap",function(){
            localStorage.setItem("place",$(this).find("p:nth-child(1)").html()+"&&"+$(this).find("p:nth-child(2)").html());
            window.location.href="allGoods.html";
        })
    }
});

window.onload = function () {

    var myScroll = new IScroll('#city_scroll', {
        probeType: 3,
        mouseWheel: true
    });

    $(".now_place span:nth-child(2)").html(localStorage.getItem("city")||"北京");
    $(".change span").html(localStorage.getItem("city")||"北京");

    $(".search input").on("focus",function(){
        $(".quxiao").css("display","block");
        $(".queding").css("display","block");
        $(".now_place").css("display","none");
        $(".change").css("display","block");
        $(".tip").css("display","none");

    })
    $(".quxiao").on("click",function(){
        $(".search").css("width","100%");
        $(".quxiao").css("display","none");
        $(".queding").css("display","none");
        $(".now_place").css("display","block");
        $(".change").css("display","none");
        $(".tip").css("display","block");
        $(".search input").val("");
        $.ajax({
            url:'/api/place',
            success: function (res) {
                    for( city in res){
                        if (res[city].name==str){
                            var data=res[city].Data;
                        }
                    }
                    var html = template('list', data);
                    $("#city_scroll").html(html);
                    if(data){
                        $("#city_scroll")[0].style.background="none";
                    }else {
                        $("#city_scroll")[0].style.background="url('/images/zong/noservice.svg') no-repeat center 20%";
                    }
            },
            complete:function(){
                $('#city_scroll ul li').on("tap",function(){
                    window.location.href="allGoods.html";
                })
            }
        });
    })
    $(".queding ").on("click",function(){
        var str=$(".search input").val();
        if(str==""||str==" "){

        }else {
            $(".search").css("width","100%");
            $(".queding").css("display","none");
            $.ajax({
                url:'/api/place',
                success: function (res) {
                        for( city in res){
                            if (res[city].name==str){
                                var data=res[city].Data;
                            }
                        }
                        $("#city_scroll")[0].style.background="none";
                        var html = template('list', data);
                        $("#city_scroll").html(html);
                        if(data){
                        }else {
                            $("#city_scroll")[0].style.background="url('/images/zong/noservice.svg') no-repeat center 20%";
                        }
                },
                complete:function(){
                    $('#city_scroll ul li').on("tap",function(){
                        localStorage.setItem("place",$(this).find("p:nth-child(1)").html()+"&&"+$(this).find("p:nth-child(2)").html());
                        window.location.href="allGoods.html";
                    })
                }
            });
        }
    })
}
