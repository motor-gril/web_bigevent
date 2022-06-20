$(function(){
    // 点击“去注册账号”
    $("#link_reg").on("click",function(){
        $(".login-box").hide();
        $(".reg-box").show();
    });


    // 点击“去登陆”
    $("#link_login").on("click",function(){
        $(".login-box").show();
        $(".reg-box").hide();
    });


    // 从layui中获取form对象
    var form = layui.form
    // 调用verify函数
    form.verify({
        // 自定义一个叫pwd的校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6-12位，且不能有空格'],
        // 确认密码的校验
        repwd:function(value){
            // 拿到的value是确认密码中的值，获取密码框中的值进行判断后
            // 如果不一致则返回一个提示信息
            if(($("#pwd").val()) !== value){
                return '两次密码不一致'
            }
        }
    });



    // 从layui中获取layer对象
    var layer = layui.layer
    // 监听注册事件
    $("#form_reg").on("submit",function(e){
        var data = { 
            username : $("#L-username").val(),
            password : $("#pwd").val()
        }
        // 阻止表单的自动提交
        e.preventDefault();
        // 发起ajax请求
        $.post('/api/reguser',
        data,
        function(res){
            if(res.status !== 0){
                return layer.msg(res.message);;
            }
            layer.msg("注册成功,请登录！");

            // 成功后自动跳转到登录
            $("#link_login").click();
        })
    });


    // 监听登录的表单
    $("#form_login").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:"POST",
            // 获取登录表单中的所有数据  返回的是对象格式
            data: $(this).serialize(),
            success:function(res){
                 if(res.status !== 0){
                     return layer.msg("登录失败,账号或用户名错误！")
                 }
                 layer.msg("登录成功！");
                //  保存登录时获取的token值,需要永久存储
                localStorage.setItem("token",res.token)
                
                // 跳转到index页面
                location.href = "./index.html";
                 
            }
        })
    })

})