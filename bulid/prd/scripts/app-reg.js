!function(s){function a(n){if(e[n])return e[n].exports;var i=e[n]={exports:{},id:n,loaded:!1};return s[n].call(i.exports,i,i.exports,a),i.loaded=!0,i.exports}var e={};return a.m=s,a.c=e,a.p="",a(0)}({0:function(s,a,e){s.exports=e(95)},95:function(s,a,e){e(96)},96:function(s,a,e){var n=e(97);$("body").html(n),$("#m-home").on("tap",function(){location.href="index.html"}),$("#loginbtn").on("tap",function(){console.log(1);var s=/^1(3|4|5|7|8)\d{9}$/;if(""!=$("#username").val().trim()){var a=s.test($("#username").val());if(a)if(""!=$("#password").val().trim())if($("#password").val()==$("#repassword").val())if("3042"==$("#checknum").val()){$(".tipbox").css("display","none");var e=new Object;e.username=$("#username").val(),e.password=$("#password").val();var n=JSON.stringify(e);sessionStorage.setItem("user",n)}else $(".tipbox").css("display","block"),$("#tip").text("验证码错误");else $(".tipbox").css("display","block"),$("#tip").text("两次输入的密码不一致");else $(".tipbox").css("display","block"),$("#tip").text("请填写正确的密码")}})},97:function(s,a){s.exports='<div class="container">    <header>       <ul>         <li id="m-home" class="fdayicon-home fdayicon"></li>         <li class="login">注册</li>         <li class="reg"></li>       </ul>    </header>    <section>      <div class="loginbox">        <div class="tipbox">          <div id="tip">不要心急哟，账号或密码还空着呐！</div>        </div>         <div class="username">           <span class="usericon">              <span class="glyphicon glyphicon-user"></span>           </span>           <input id="username"  type="text" name="name" value="" placeholder="请输入手机号码">         </div>         <div class="username">           <span class="usericon">              <span class="glyphicon glyphicon-lock"></span>           </span>           <input id="password" type="password" name="name" value="" placeholder="设置新密码">         </div>         <div class="username">           <span class="usericon">              <span class="glyphicon glyphicon-pencil"></span>           </span>           <input id="repassword" type="password" name="name" value="" placeholder="确认新密码">         </div>         <div class="username">           <input id="checknum" class="check" type="text" name="name" value="" placeholder="请输入验证码">           <span class="checkimg">              <img src="/images/yan/1.jpg" alt="验证码">           </span>         </div>         <div class="username">           <span class="usericon">              <span class="glyphicon glyphicon-send"></span>           </span>           <input class="phoneinput" type="text" name="name" value="" placeholder="输入手机验证码">           <span class="phonecheck">              <button type="button" name="button">点击获取</button>           </span>         </div>         <div class="login">            <button type="button" name="button" id="loginbtn">注册</button>         </div>      </div>    </section></div>'}});