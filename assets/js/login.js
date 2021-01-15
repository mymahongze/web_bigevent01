$(function () {
    // 点击去注册账号 隐藏登录区域 显示注册区域
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    // 点击登陆账号 显示登陆区域 隐藏注册区域
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide() 
    })
    
    //自定义校验规则
    var form = layui.form;
    form.verify({
        //属性就是定义的规则名称
        pwd: [
            //数组中第一个元素 正则
            //数组中第二个元素 报错信息
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码输入是否一致规则
        repwd:function (value) {
            //获取
            var pwd = $(".reg-box input[name=password]").val();
            //比较
            if (pwd != value) {
                return '两次密码输入不一致'
            }
        }
    });

    // 3.注册
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //发送ajax
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function (res) {
                //校验
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //成功
                layer.msg('注册成功,请登录！')
                //跳转到登录
                $('#link_login').click()
                // 重置form
                $('#form_reg')[0].reset()
            }
        });
    });

    //4.登录
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("登录成功！");
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        });
    });


})