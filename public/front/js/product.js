/**
 * Created by HUCC on 2018/1/16.
 */
$(function () {

  //1. 先获取地址栏中的productId
  var productId = getSearch("productId");

  //2. 发送ajax请求，获取数据，渲染页面
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:productId
    },
    success:function (info) {
      //返回的结果，里面没有一个数组，存储了所有的尺码，只有一个size：30-40
      console.log(info);
      //var temp = info.size.split("-");
      //var sizeArray = [];
      //for(var i = +temp[0]; i <= temp[1]; i++) {
      //  sizeArray.push(i);
      //}
      //info.sizeArray = sizeArray;

      $(".mui-scroll").html( template("tpl", info) );

      //重新初始化轮播图组件
      mui(".mui-slider").slider({
        interval:2000
      });

      //重新初始化数字框
      mui(".mui-numbox").numbox();

      //尺码选择的功能
      $(".lt_size span").on("click", function () {

        $(this).addClass("now").siblings().removeClass("now");

      });


    }
  });


  //3. 加入购物车
  $(".btn_add_cart").on("click", function () {

    //获取尺码
    var size = $(".lt_size span.now").text();
    if(!size){
      mui.toast("请选择尺码");
      return;
    }

    //获取数量
    var num = $(".mui-numbox-input").val();

    //发送ajax请求
    $.ajax({
      type:'post',
      url:"/cart/addCart",
      data:{
        productId:productId,
        num:num,
        size:size
      },
      success:function (info) {
        console.log(info);
        //未登录状态
        if(info.error == 400){
          //跳转到登录页面，需要加一个参数，retUrl,目的是为了可以跳回当前页面
          location.href = "login.html?retUrl="+location.href;
        }

        //成功的处理
        if(info.success){
          //参数1：提示内容
          //参数2：提示标题
          //参数3：数组，两个值，按钮
          //参数4：回调函数，可以知道点击了哪个按钮
          mui.confirm("添加成功","温馨提示", ["去购物车", "继续浏览"], function (e) {
            if(e.index === 0){
              location.href = "cart.html";
            }
          })
        }

      }
    })


  });


});