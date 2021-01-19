$(function () {
    //定义昵称校验规则
    var form = layui.form;
    form.verify({
        nickname:function (value) {
            if (value.length > 6) {
                return "昵称长度为1 ~ 6位之间！"
            }
        }
    })

    // 获取和渲染用户信息
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method:"GET",
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);

                form.val('formUserInfo',res.data)
            }
        });
    }

    //重置 给form表单绑定reset事件 button按钮绑定click事件
    $("#btnReset").on("click", function (e) { 
        e.preventDefault()
        initUserInfo()
    })
    
    //提交用户信息
    var layer = layui.layer;
    $(".layui-form").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //更新成功 渲染父页面(调用父页面中更新用户信息和头像的方法)
                window.parent.getUserInfo()
            }
        });
    })

})