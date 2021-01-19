$(function () {
    // 1.定义密码规则
    var form = layui.form;
    form.verify({
        //所有密码
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        //新旧密码不重复
        samepwd:function (value) {
            if (value === $("input[name=oldPwd]").val()) {
                return "新密码和旧密码不能相同！"
            }
        },
        //两次密码必须相同
        repwd:function (value) {
            if (value !== $("input[name=newPwd]").val()) {
                return "确认密码和新密码必须一致！"
            }
        }
    })

    //2.修改密码
    $(".layui-form").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("修改密码失败！")
                }
                layui.layer.msg("修改密码成功！")
                $(".layui-form")[0].reset()
            }
        });
    })
})