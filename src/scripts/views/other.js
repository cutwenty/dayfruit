var str = require('../tpls/other.string');
var common = require('../utils/common.util.js');


$('body').html(str);

window.onload = function(){

  if(common.isLogin()){//已经登录
    init();
  }else{//未登录
    window.location.href = "/dayfruit/login.html";
  }
}
//初始化界面
function init(){
  var otherScroll = new IScroll('#other-scroll',{
    preventDefault:false
  });
  setUserInfo();
  quit();
}
//设置用户信息
function setUserInfo(){
  var userName = common.getUserName();
  $('.user-phone').html(userName);
}
//退出登录
function quit(){
  $("#quitBtn").on('click',function(){
    common.quitLogin();
  });
}
