!function(i){function n(a){if(o[a])return o[a].exports;var l=o[a]={exports:{},id:a,loaded:!1};return i[a].call(l.exports,l,l.exports,n),l.loaded=!0,l.exports}var o={};return n.m=i,n.c=o,n.p="",n(0)}({0:function(i,n,o){i.exports=o(86)},86:function(i,n,o){o(87)},87:function(i,n,o){var a=o(88);$("body").html(a),$("#m-home").on("tap",function(){location.href="index.html"})},88:function(i,n){i.exports='<div class="container">  <header>    <ul>      <li id="m-home" class="fdayicon-home fdayicon"></li>      <li class="login">我的果园</li>      <li class="reg"><a href="/dayfruit/cart.html"><span class="fdayicon fdayicon-cart"></span></a></li>    </ul>  </header>  <section>    <div class="box">       <ul>          <li class="active">未完成</li>          <li>已完成</li>          <li>已取消</li>       </ul>       <div class="unfinished-order">         <i></i>       <span class="fdayicon fdayicon-userorder icon"></span>          <h4>亲，您没有该状态下的订单信息哦~</h4>       </div>    </div>  </section></div>'}});