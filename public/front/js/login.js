/**
 * Created by HUCC on 2018/1/17.
 */
$(function () {

  //1. 给登录按钮注册点击事件，阻止表单提交。
  //2. 获取到用户名和密码，做一个简单的校验
  //3. 通过之后，发送ajax请求
  $(".btn_login").on("click", function (e) {

    e.preventDefault();

    var username = $("[name='username']").val();
    var password = $("[name='password']").val();

    //表单校验
    if(!username) {
      mui.toast("用户名不能为空");
      return;
    }

    if(!password) {
      mui.toast("用户密码不能为空");
      return;
    }

    //发送ajax请求
    $.ajax({
      type:"post",
      url:"/user/login",
      data:{
        username:username,
        password:password
      },
      success:function (info) {
        if(info.error){
          mui.toast(info.message);
        }

        if(info.success){
          //怎么办？ 判断是否带了retUrl的参数，如果带了这个参数，直接跳转到对应的地址。
          //获取retUrl的参数，如果有，跳转回去
          if(location.search.indexOf("retUrl") == -1){
            //没有
            location.href = "user.html";
          }else {
            //有，跳转到retUrl对应的值
            var search = location.search;
            //没有用getSearch
            search = search.replace("?retUrl=", "");
            location.href = search;
          }


        }
      }
    })

  });


});