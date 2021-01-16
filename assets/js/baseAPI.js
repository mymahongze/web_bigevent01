// 开发环境
var baseURL = "http://api-breakingnews-web.itheima.net"

//在发送ajax() get() post()方法之前会先触发这个函数
$.ajaxPrefilter(function (options) {
    // 1.添加根路径
    options.url = baseURL + options.url
    // console.log(options.url);
    // 2.身份认证 给有权限的路径添加头信息
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    // 3.登陆拦截(不登录不允许访问其他页面)
    options.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status === 1 && obj.message == '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem("token")
            // 2.强制跳转到登录页面
            location.href = "/login.html"
        }
       
    }
})