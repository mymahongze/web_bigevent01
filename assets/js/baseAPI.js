// 开发环境
var baseURL = "http://api-breakingnews-web.itheima.net"

//在发送ajax() get() post()方法之前会先触发这个函数
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url
    console.log(options.url);
})