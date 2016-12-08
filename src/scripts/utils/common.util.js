var cookieUtil = require('./cookieBox.js');

var Info = {
  //是否已经登录
  isLogin:function(){
    if(cookieUtil.getCookie('user')){
      return true;
    }else{
      return false;
    }
  },
  //取得用户名
  getUserName:function(){
    if(this.isLogin()){
      var user = eval("("+cookieUtil.getCookie('user')+")");
      if(user.username){
        return user.username;
      }else{
        return false;
      }
    }else{
      return false;
    }
  },
  //退出登录
  quitLogin:function(){
    var date=new Date();
    date = date.getDate()-10;
    document.cookie = name+"="+'user'+';path=/'+";expires="+date;
    location.reload();
  }
}
module.exports = Info;
