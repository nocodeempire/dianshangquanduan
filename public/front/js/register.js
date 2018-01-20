/**
 * Created by HUCC on 2018/1/17.
 */
$(function () {

  //功能1：获取验证码
  $(".btn_getCode").on("click", function (e) {
    //1.1 阻止默认行为
    e.preventDefault();


    //1.2 禁用调用按钮
    var $this = $(this);
    $this.prop("disabled", true).addClass("disabled").text("发送中...");

    //1.3 发送ajax请求，获取验证码
    $.ajax({
      type: 'get',
      url: '/user/vCode',
      success: function (info) {
        console.log(info);

        //需要开启一个倒计时，5秒后才能再次发送
        var time = 5;
        var timeId = setInterval(function () {
          time--;
          $this.text(time + "秒后再次发送");

          if(time <= 0) {
            //清除定时器
            clearInterval(timeId);
            //恢复按钮
            $this.prop("disabled", false).removeClass("disabled").text("再次发送");
          }

        }, 1000);

      }
    });

  });



  //功能2：注册功能
  //1.4 注册功能
  $(".btn_register").on("click", function (e) {
    e.preventDefault();


    //获取表单值
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repass = $(".repass").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();


    //校验
    if(!username) {
      mui.toast("请输入用户名");
      return;
    }
    if(!password) {
      mui.toast("请输入密码");
      return;
    }

    if(repass != password){
      mui.toast("两次输入的密码不一致");
      return;
    }

    if(!mobile) {
      mui.toast("请输入手机号");
      return;
    }

    //手机正则表达式  宽松 199
    //  /^1\d{10}$/
    if(!/^1[3-9]\d{9}$/.test(mobile)){
      mui.toast("请输入正确的手机号");
      return;
    }

    if(!vCode) {
      mui.toast("请输入验证码");
      return;
    }



    //发送ajax请求
    $.ajax({
      type:"post",
      url:"/user/register",
      data: $("form").serialize(),
      success:function (info) {
        if(info.error) {
          mui.toast(info.message);
        }

        if(info.success) {
          mui.toast("恭喜你，注册成功，一秒后跳转到登录页面");
          setTimeout(function () {
            location.href = "login.html";
          }, 1000);
        }
      }
    })



  });
});