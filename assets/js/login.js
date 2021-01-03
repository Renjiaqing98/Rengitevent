$(function () {
  //点击前往注册模块
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  //点击前往登录模块
  $('#link_login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })

  //获取layui.js 的form对象
  var form = layui.form;
  var layer = layui.layer;
  //通过form.verify 函数自定义校验规则
  form.verify({
    //自定义了一个pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6-12位,切不能出现空格'],
    repwd: function (value) {
      var pwd = $('#layui-pwd').val();
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  //点击注册 发起ajax请求
  $('#form_reg').on('submit', function (e) {

    //阻止表单默认提交行为
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          // return console.log(res.message);
          return layer.msg(res.message);
        }
        // console.log('注册成功');
        layer.msg('注册成功,请登录!');
        $('#link_login').click();
      }
    })
  })

  //点击登录 发起ajax请求并跳转到主页
  $('#form_login').on('submit',function(e) {
    e.preventDefault();
    $.ajax({
      method:'POST',
      url:'/api/login',
      //快速获取表单数据
      data:$(this).serialize(),
      success:function(res) {
        // console.log(res);
        if(res.status !== 0) {
          return layer.msg('登录失败!')
        }
        layer.msg('登录成功!')
        //登录成功跳转到首页
        localStorage.setItem('token',res.token)
        location.href = '/index.html';

      }
    })
  })
}) 