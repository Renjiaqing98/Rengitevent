$(function () {
    //校验表单数据
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '输入的昵称必须在1-6个字符之间'
            }
        }
    })
    initUserInfo();
    //发起GET ajax请求
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置按钮
    $('#chongzhi').on('click', function (e) {
        //阻止默认重置
        e.preventDefault();
        initUserInfo();
    })
    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        //发起POST ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                layer.msg('修改用户信息成功')
                // 调用父页面中的方法
                window.parent.getUserInfo();
            }
        })
    })

})