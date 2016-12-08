/**
 * Created by Administrator on 2016/10/7.
 */
module.exports={
    setBall:function(){
        var $shopCarIcon= $(".fdayicon-cart");
        $shopCarIcon.css({
          position:"relative"
        })
        var ball=$("<span>7</span>")
        $shopCarIcon.append(ball);
        ball.css({
            position:"absolute",
            top:"-0.03rem",
            right:"-0.05rem",
            width:".15rem",
            height:".15rem",
            borderRadius:"50%",
            background:"#c9302c",
            color:"#fff",
            lineHeight:".15rem",
            fontSize:".08rem",
            textAlign:"center"
        })
    }
}