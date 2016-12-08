;
var CookieUtil = {
    /**
     * 在根目录下设置cookie
     * @param name 键（名称）
     * @param value 值
     * @param days  保存天数,不写时默认30天
     */
    setCookieRoot:function(name,value,days){
        var date = new Date();
        if((typeof days == "number") && days!=undefined){
            date.setDate(date.getDate()+days);
            //value = encodeURIComponent(value); //转码
            document.cookie =name+"="+value+";path=/;expires="+date;
        }else{
            date.setDate(date.getDate()+30);
            //value = encodeURIComponent(value); //转码
            document.cookie =name+"="+value+";path=/;expires="+date;
        }
    },
    /**
     * 在根目录下删除cookie
     * @param name
     */
    removeCookieRoot:function(name){
        CookieUtil.setCookieRoot(name,"",-1);
    },
    /**
     * 设置cookie
     * @param name 键（名称）
     * @param value 值
     * @param days  保存天数,不写时默认30天
     */
    setCookie:function(name,value,days){
        var date = new Date();
        if((typeof days == "number") && days!=undefined){
            date.setDate(date.getDate()+days);
            //value = encodeURIComponent(value); //转码
            return document.cookie =name+"="+value+";expires="+date;
        }else{
            date.setDate(date.getDate()+30);
            //value = encodeURIComponent(value); //转码
            return document.cookie =name+"="+value+";expires="+date;
        }
    },
    /**
     * 取得cookie
     * @param name 键（名称）
     * @returns {*} 值,没有返回undefined
     */
    getCookie: function (name){
        var cookieValue;
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for(var i = 0;i<arrCookie.length;i++){
            var item = arrCookie[i].split("=");
            if(item[0]==name){
                //cookieValue = decodeURIComponent(item[1]);
                cookieValue = item[1];
            }
        }
        return cookieValue;
    },
    /**
     * 删除cookie
     * @param name 键（名称）
     */
    removeCookie: function (name){
        document.cookie = this.setCookie(name,"",-1);
    },
    /**
     * 注册一个新用户。
     * @param name
     * @param password
     * @returns {number} 1:成功，-1：用户已存在
     */
    setLoginCookie:function(name,password){
        if(!this.getLoginCookie(name)){
            var oldCookie=CookieUtil.getCookie("logincookie");
            var newCookie;
            if(oldCookie){
                newCookie=oldCookie+"||"+name+"&&"+password;
            }else {
                newCookie=name+"&&"+password;
            }
            CookieUtil.setCookie("logincookie",newCookie,30);
            return 1;
        }else{
            return -1;
        }
    },

    /**
     * 根据用户名获取密码
     * @param name 用户名
     * @returns {*} 返回用户名，没有则返回undefined
     */
    getLoginCookie:function(name){
        var password;
        var strCookie=CookieUtil.getCookie("logincookie");
        var arrCookie=strCookie.split("||");
        for(var i=0;i<arrCookie.length;i++){
            var arrItem=arrCookie[i].split("&&");
            if(arrItem[0]==name){
                password=arrItem[1];
            }
        }
        return password;
    },
    /**
     * 更新密码
     * @param name 用户名
     * @param password 新密码
     * @param oldpassword 旧密码
     */
    updatePassword:function (name,password,oldpassword){
        var passwordCookie = this.getLoginCookie(name);
        if(oldpassword==passwordCookie){
            var strCookie=CookieUtil.getCookie("logincookie");

            var arrCookie=strCookie.split("||");
            for(var i=0;i<arrCookie.length;i++){
                var arrItem=arrCookie[i].split("&&");
                if(arrItem[0]==name){
                    arrCookie[i]=name+"&&"+password;
                    break;
                }
            }
            var newStrCookie=arrCookie.join("||");
            CookieUtil.setCookie("logincookie",newStrCookie,30);
        }
    },

    /**
     * 将对象添加到cookie中
     * @param cookieName
     * @param obj 对象必须要有唯一  id  标识，(可选的  count 计数。如果count有赋值则加上赋值的数值。)
     * @param days 保存的天数
     */
    addObjectToCookie: function(cookieName,obj,days){
        //cookieName存在
        if(CookieUtil.getCookie(cookieName)){

            var cookie = CookieUtil.getCookie(cookieName);
            var arr = cookie.split("||");
            var isExist = false;//标记obj是否存在。
            var s = "";
            for(var i = 0;i<arr.length;i++){
                var object = JSON.parse(arr[i]);
                if(object.id==obj.id){
                    if(obj.count){
                        object.count += obj.count;
                    }else{
                        object.count++;//记住个数。
                    }
                    arr[i]=JSON.stringify(object);
                    isExist = true;
                    break;
                }
            }
            if(!isExist){//不存在
                arr.push(JSON.stringify(obj));
            }
            s = arr.join("||");
            if((typeof days) == "number" && days!=undefined){
                CookieUtil.setCookie(cookieName,s , days);
            }else{
                CookieUtil.setCookie(cookieName,s,30);
            }

        }else{//cookieName不存在
            if((typeof days) == "number" && days!=undefined){
                CookieUtil.setCookie(cookieName,JSON.stringify(obj),days);
            }else{
                CookieUtil.setCookie(cookieName,JSON.stringify(obj),30);
            }
        }
    },
    /**
     * 在cookie中删除对象
     * @param cookieName
     * @param obj
     * @returns {boolean} 成功返回true,失败返回false
     */
    deleteObjectInCookie:function (cookieName,obj){
        if(CookieUtil.getCookie(cookieName)){
            var cookie = CookieUtil.getCookie(cookieName);
            var arr = cookie.split("||");
            var s = "";
            var isExist = false;
            for(var i = 0;i<arr.length;i++){
                var object = JSON.parse(arr[i]);
                if(object.id==obj.id){
                    arr.splice(i,1);
                    isExist = true;
                    break;
                }
            }
            if(!isExist){
                return false;
            }else{
                s = arr.join("||");
                CookieUtil.setCookie(cookieName,s);
                return true;
            }
        }else{
            return false;
        }
    },
    /**
     * 获取对象，使用id
     * @param cookieName
     * @param id
     * @returns {*} 没有找到返回false，否则返回该对象。
     */
    getObjectInCookie:function(cookieName,id){
        if(CookieUtil.getCookie(cookieName)){
            var cookie = CookieUtil.getCookie(cookieName);
            var arr = cookie.split("||");
            for(var i = 0;i<arr.length;i++){
                var obj = eval("("+arr[i]+")");
                if(obj.id == id){
                    return obj;
                }
            }
            return false;
        }else{
            return false;
        }
    },
    /**
     * 取得某个cookie里的所有对象
     * @param cookieName
     * @returns {boolean}
     */
    getAllObjectInCookie:function(cookieName){
        if(CookieUtil.getCookie(cookieName)){
            var cookie = CookieUtil.getCookie(cookieName);
            var arr = cookie.split("||");
            return arr;
        }else{
            return false;
        }
    }
};

module.exports = CookieUtil;
