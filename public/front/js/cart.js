/**
 * Created by HUCC on 2018/1/17.
 */
$(function () {

  //mui的坑：
    //1. 结束下拉刷新的方法：不是endPullDown，而是endPulldownToRefresh()
    //2. 在mui的下拉刷新中，禁用了click事件，需要使用tap事件


  //结束下拉刷新的方法：  mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
  //手动下拉刷新：mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();


  //思路：
  //1. 使用mui.init( pullRefresh:{   container:'', down:{}   } )
  //$.ajax({
  //  type: 'get',
  //  url: '/cart/queryCart',
  //  success: function (info) {
  //    console.log(info);
  //    if (info.error == 400) {
  //      //没有登录
  //      location.href = "login.html?retUrl=" + location.href;
  //    }
  //    //这里处理成功的逻辑。
  //    $("#OA_task_2").html(template("tpl", {list: info}));
  //  }
  //})


  //1. 下拉刷新的功能
  mui.init({
    pullRefresh: {
      //下拉刷新的容器
      container: '.mui-scroll-wrapper',
      //配置下拉刷新
      down: {
        auto: true,
        //下拉刷新的时候，会触发这个函数
        callback: function () {
          console.log("呵呵");
          //功能1： 发送ajax请求，获取购物车的数据
          $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            success: function (info) {

              setTimeout(function () {

                console.log(info);
                if (info.error == 400) {
                  //没有登录
                  location.href = "login.html?retUrl=" + location.href;
                }
                //这里处理成功的逻辑。
                $("#OA_task_2").html(template("tpl", {list: info}));

                //结束下拉刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();

              }, 1000);

            }
          })

          //setTimeout(function () {
          //  //结束下拉刷新，文档不对
          //  mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
          //}, 1000);
        }
      }
    }
  });



  //2. 删除功能
  //2.1 找到所有的删除按钮，注册点击事件
  $("#OA_task_2").on("tap", ".btn_delete", function () {
    //2.2 获取删除的id
    var id = $(this).parent().data("id");

    mui.confirm("你是否要删除这个商品", "温馨提示", ["是", "否"], function (e) {
      if(e.index===0){
        //2.3 发送ajax请求
        $.ajax({
          type:'get',
          url:"/cart/deleteCart",
          data:{
            //这是个数组
            id:[id]
          },
          success:function (info) {
            if(info.success){
              //使用js代码让下拉刷新容器刷新一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }
    });

  })


  //3. 修改功能
  $("#OA_task_2").on("tap", ".btn_edit", function (){

    //3.1 获取购物车的数据
    var data = this.dataset;
    //3.2 配合模版引擎，渲染数据
    console.log(data);

    var html = template("tpl2", data);
    //把html中所有的换行(\n)给替换掉，因为mui会把\n给替换成br
    html = html.replace(/\n/g, "");

    mui.confirm(html, "编辑商品", ["确定", "取消"], function (e) {
      if(e.index == 0){

        //获取到商品的id  尺码  数量  发送ajax请求
        var id = data.id;
        var size = $(".lt_edit_size span.now").text();
        var num = $(".mui-numbox-input").val();

        $.ajax({
          type:'post',
          url:'/cart/updateCart',
          data:{
            id:id,
            size:size,
            num:num
          },
          success:function (info) {
            if(info.success){
              //成功后下拉一次
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });


      }
    });


    //初始化numbox
    mui(".mui-numbox").numbox();

    //尺码选择功能
    $(".lt_edit_size span").on("click", function () {
      $(this).addClass("now").siblings().removeClass("now");
    });

  });



  //4. 计算价格
  //给所有的ck注册点击事件
  $("#OA_task_2").on("change", ".ck", function () {
    //所有被选中的checkbox
    var total = 0;
    $(".ck:checked").each(function () {
      var price = $(this).data("price");
      var num = $(this).data("num");

      total += price * num;
    });

    //保留两位小数
    total = total.toFixed(2);
    console.log(total);

    $(".lt_total span").text(total);
  });
});