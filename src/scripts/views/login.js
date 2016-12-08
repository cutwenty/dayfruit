var logintpl = require('../tpls/login.string');
var cookieUtil = require('../utils/cookieBox.js');
$("body").html(logintpl);
$("#goreg").on("tap", function() {
  location.href = $(this).attr('data-url');

})
$('#index-m').on('tap',function(){
  location.href = $(this).attr('url');
})
$("#loginbtn").on("tap", function() {
  if ($("#username").val() != "") {
    if ($("#password").val() != "") {

      $.ajax({
        url: "/dayfruit/api/user",
        type: "get",
        success: function(data) {
          var flag = false;
          for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);
            // console.log($("#username").val());
            // console.log($("#password").val());
            if ($("#username").val() == data[i].username) {
              flag = true;
              if ($("#password").val() == data[i].password) {
                var obj = new Object();
                obj.username = $("#username").val();
                obj.password = $("#password").val();
                var str = JSON.stringify(obj);
                console.log(str);
                cookieUtil.setCookie("user", str, 10);
                location.href = "./index.html";
              } else {
                // console.log("密码错误");
                $(".tipbox").css("display", "block");
                $("#tip").text("密码错误！");
              }
            }
          }
          if (!flag) {
            console.log("帐号不存在");
            $(".tipbox").css("display", "block");
            $("#tip").text("帐号不存在！");
          }
        },
        error: function() {
          console.log("获取失败！");
        }
      });
    } else {
      console.log("密码为空！");
      $(".tipbox").css("display", "block");
      $("#tip").text("不要心急哟，账号或密码还空着呐！");
    }
  } else {
    console.log("帐号为空！");
    $(".tipbox").css("display", "block");
    $("#tip").text("不要心急哟，账号或密码还空着呐！");
  }
})
