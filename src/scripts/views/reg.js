var regtpl = require('../tpls/reg.string');


$("body").html(regtpl);
$("#m-home").on('tap',function(){
  location.href = 'index.html';
});
$("#loginbtn").on("tap", function() {
  console.log(1);
  var reg = /^1(3|4|5|7|8)\d{9}$/;
  if ($("#username").val().trim() !="") {
    var flag = reg.test($("#username").val());
    if (flag) {
       if($("#password").val().trim() != ""){
           if($("#password").val() == $("#repassword").val()){
              if($("#checknum").val()=='3042'){
                $(".tipbox").css("display", "none");
                var obj = new Object();
                obj.username = $("#username").val();
                obj.password = $("#password").val();
                var str = JSON.stringify(obj);
                sessionStorage.setItem("user", str);
              }else{
                $(".tipbox").css("display", "block");
                $("#tip").text("验证码错误");
              }
           }else {
             $(".tipbox").css("display", "block");
             $("#tip").text("两次输入的密码不一致");
           }
       }else {
         $(".tipbox").css("display", "block");
         $("#tip").text("请填写正确的密码");
       }
    }
  }
});
