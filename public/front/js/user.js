/**
 * Created by HUCC on 2018/1/17.
 */
$(function () {

  //1. 发送ajax请求，获取当前登录用户的个人信息
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function (info) {
      console.log(info);
      if(info.error == 400){
        //没登录，跳转到登录页
        location.href = "login.html";
      }

      //说明当前用户已经登录
      $(".userinfo").html( template("tpl", info) );

    }
  });


  //2. 退出功能
  $(".btn_logout").on("click", function () {

    $.ajax({
      type:"get",
      url:"/user/logout",
      success:function (info) {
        if(info.success){
          location.href = "login.html";
        }
      }
    })

  });

});