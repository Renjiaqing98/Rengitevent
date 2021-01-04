$(function () {
    //调用get请求函数
    getUserInfo();

    //点击按钮退出登录用户并返回登录页面
    var layer = layui.layer;
    $('#break').on('click', function () {
        layer.confirm('是否确定退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

//封装ajax get请求函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers 就是请求头的配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染函数
            renderAvatar(res.data);
        },

    })
    

}
//封装渲染头像函数
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需要渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        //获取用户名第一个字
        var flast = name[0].toUpperCase();
        $('.text-avatar').attr(flast).show();
    }
}