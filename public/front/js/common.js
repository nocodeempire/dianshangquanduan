/**
 * Created by HUCC on 2018/1/14.
 */
//初始化区域滚动效果
mui(".mui-scroll-wrapper").scroll({
  indicators:false,//关闭滚动条
});

//初始化轮播图
mui(".mui-slider").slider({
  interval:1000
});

/*获取地址栏所有的参数，返回一个对象*/
function getSearchObj() {
  //1. 获取地址栏的参数
  var search = location.search;
  //2. 对地址进行解码
  search = decodeURI(search);
  //3. 干掉? slice sutstr substring
  search = search.slice(1);//支持负数
  //search = search.substr(1, search.length -1);
  //search = search.substring(1);//不支持负数
  //search = search.slice(0, -1);//支持负数
  //4. 字符串切割
  var arr = search.split("&");
  //5. 把数据变成对象
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var key = arr[i].split("=")[0];
    var value = arr[i].split("=")[1];
    obj[key] = value;
  }
  return obj;
}

/*获取地址栏指定的参数，返回值*/
function getSearch(key) {
  return getSearchObj()[key];
}