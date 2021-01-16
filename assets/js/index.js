$(function () {
    // 获取用户信息
    getUserInfo();

    //退出登录功能
    var layer = layui.layer
    $("#btnLogout").on("click",function () {
        //弹窗
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //清空本地token
            localStorage.removeItem("token")
            // 页面跳转
            location.href = "/login.html"
            //关闭询问框
            layer.close(index);
          });
    })

})

// 获取用户信息封装到入口函数外面了 因为后面其他页面要用
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        //用户设置请求头信息
        // headers: {
            //Authorization 属性用户身份验证
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功 渲染头像
            renderAvatar(res.data)
        }
    });
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;"+name)
    // 渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src",user.user_pic)
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".text-avatar").show().html(text)
    }
}