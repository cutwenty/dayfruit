!function(e){function o(n){if(t[n])return t[n].exports;var s=t[n]={exports:{},id:n,loaded:!1};return e[n].call(s.exports,s,s.exports,o),s.loaded=!0,s.exports}var t={};return o.m=e,o.c=t,o.p="",o(0)}({0:function(e,o,t){e.exports=t(83)},7:function(e,o){var t={setCookie:function(e,o,t){var n=new Date;n.setDate(n.getDate()+t),document.cookie=e+"="+encodeURIComponent(o)+";expires="+n},getCookie:function(e){for(var o,t=document.cookie.split("; "),n=0;n<t.length;n++){var s=t[n].split("=");s[0]==e&&(o=s[1])}return o?decodeURIComponent(o):o},removeCookie:function(e){this.setCookie(e,"",-1)}};e.exports=t},83:function(e,o,t){t(84)},84:function(e,o,t){var n=t(85),s=t(7);$("body").html(n),$("#goreg").on("tap",function(){location.href=$(this).attr("data-url")}),$("#index-m").on("tap",function(){location.href=$(this).attr("url")}),$("#loginbtn").on("tap",function(){""!=$("#username").val()?""!=$("#password").val()?$.ajax({url:"/dayfruit/api/user",type:"get",success:function(e){for(var o=!1,t=0;t<e.length;t++)if($("#username").val()==e[t].username)if(o=!0,$("#password").val()==e[t].password){var n=new Object;n.username=$("#username").val(),n.password=$("#password").val();var i=JSON.stringify(n);console.log(i),s.setCookie("user",i,10),location.href="./index.html"}else $(".tipbox").css("display","block"),$("#tip").text("密码错误！");o||(console.log("帐号不存在"),$(".tipbox").css("display","block"),$("#tip").text("帐号不存在！"))},error:function(){console.log("获取失败！")}}):(console.log("密码为空！"),$(".tipbox").css("display","block"),$("#tip").text("不要心急哟，账号或密码还空着呐！")):(console.log("帐号为空！"),$(".tipbox").css("display","block"),$("#tip").text("不要心急哟，账号或密码还空着呐！"))})},85:function(e,o){e.exports='<div class="container">    <header>       <ul>         <li id="index-m" class="fdayicon-home fdayicon" url=\'index.html\'></li>         <li class="login">登录</li>         <li class="reg"><span id=\'goreg\' data-url=\'./register.html\'>注册</span> </li>       </ul>    </header>    <section>      <div class="loginbox">         <div class="tipbox">           <div id="tip">不要心急哟，账号或密码还空着呐！</div>         </div>         <div class="username">           <span class="usericon">              <span class="glyphicon glyphicon-user"></span>           </span>           <input id="username" type="text" name="name" value="" placeholder="手机号/邮箱">         </div>         <div class="username">           <span class="usericon">              <span class="glyphicon glyphicon-lock"></span>           </span>           <input id="password" type="password" name="name" value="" placeholder="请输入密码">         </div>         <div class="login">            <button type="button" name="button" id="loginbtn">登录</button>         </div>         <div class="forget">            <a href="fast">快捷登录</a>            <a href="forget">忘记密码</a>         </div>      </div>    </section></div>'}});