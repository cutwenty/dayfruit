!function(t){function i(c){if(e[c])return e[c].exports;var l=e[c]={exports:{},id:c,loaded:!1};return t[c].call(l.exports,l,l.exports,i),l.loaded=!0,l.exports}var e={};return i.m=t,i.c=e,i.p="",i(0)}({0:function(t,i,e){t.exports=e(101)},101:function(t,i,e){e(102)},102:function(t,i,e){var c=e(103);$("body").html(c);var c=localStorage.getItem("get-city");$(".where_city header div").html(c),$.ajax({url:"/dayfruit/api/city2",success:function(t){for(city in t)if(t[city].name==c){console.log(t[city].name);var i=t[city].Data}var e=template("list",i);$("#city_scroll").html(e)}}),window.onload=function(){new IScroll("#city_scroll",{probeType:3,mouseWheel:!0});$("#city_scroll ul li").on("tap",function(){console.log($(this).html()),localStorage.setItem("city",localStorage.getItem("get-city")),window.location.href="index.html"})}},103:function(t,i){t.exports='<div class="where_city">    <header>        <a href="./where.html">            <i class="fdayicon fdayicon-navback"></i>        </a>        <div>                    </div>    </header>    <section>        <div class="where">            <h5>当前位置</h5>            <div>北京</div>        </div>        <div class="city_list">            <h5>省/市列表</h5>            <div id="city_scroll">                  <script id="list" type="text/html">                    <ul>                      {{each data as value i}}                      <li>{{value.city}}</li>                      {{/each}}                    </ul>                  </script>            </div>        </div>    </section></div>'}});