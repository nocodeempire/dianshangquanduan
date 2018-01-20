/**
 * Created by HUCC on 2018/1/16.
 */

$(function () {



  //获取历史记录，会返回一个数组
  function getHistory(){
    var history = localStorage.getItem("lt_search_history") || '[]';
    var arr = JSON.parse(history);
    return arr;
  }

  function render() {
    //1.1 获取localStorage中lt_search_history对应的值
    var arr = getHistory();
    //1.2 使用模版引擎渲染数据, 模版和数据绑定之后，模版是通过对象的属性来获取对象的值。
    $(".lt_history").html( template("tpl", {arr:arr}) );
  }

  //1. 搜索历史记录渲染
  render();



  //2. 清空历史记录
  $(".lt_history").on("click", ".btn_empty", function () {

    mui.confirm("您是否要清空所有的历史记录?", "温馨提示", ["是", "否"],function (e) {
      //e.index记录了你点的是第几个按钮
      if(e.index === 0){
        //直接把localStorage中的lt_search_history删掉
        localStorage.removeItem("lt_search_history");
        render();
      }

    });

  });



  //3. 删除历史记录
  //3.1 给所有的x注册委托事件
  $(".lt_history").on("click", ".btn_delete", function () {
    //3.2 获取当前x对应的下标（index）
    var index = $(this).data("index");
    //3.3 获取历史记录（arr）
    var arr = getHistory();
    //3.4 删除arr中对应的index项的数据
    arr.splice(index, 1);
    //3.5 重新设置会localStorage中
    localStorage.setItem("lt_search_history", JSON.stringify(arr));
    //3.6 重新渲染
    render();
  })





  //添加的需求：
    //1. 历史记录最大不超过10
    //2. 如果搜索的历史记录，已经存在，需要把这个历史记录移动到最前面。
  //4. 添加历史记录
  //4.1 给按钮注册点击事件
  $(".search_btn").on("click", function () {
    //4.2 获取输入的关键字(key)
    var key = $(".search_text").val().trim();
    $(".search_text").val('');
    if(!key){
      mui.toast("请输入搜索关键字");
      return;
    }
    //4.3 获取历史记录（arr）
    var arr = getHistory();
    //4.4 把key存到arr的最前面

    //4.4.1 判断数组中是否包含了key，有就删除即可。
    var index = arr.indexOf(key);//获取key在数组中第一次出现的下标
    if(index != -1){
      //说明存在,删除
      arr.splice(index, 1);
    }

    //4.4.2 历史记录不能超过10
    if(arr.length >= 10){
      arr.pop();
    }

    arr.unshift(key);
    //4.5 重新设置到localStorage
    localStorage.setItem("lt_search_history", JSON.stringify(arr));
    //4.6 渲染
    render();

    //4.7 页面跳转到 搜索列表页，注意：需要你你的搜索关键字带上
    location.href = "searchList.html?key="+key;
  });


});