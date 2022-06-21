$(function () {
    getUserInfo();
    // 获取用户基本信息
    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败");
                }
                renderAvatar(res.data);

            },
            // 不论成功或失败，最终都会调用complete回调函数
            /*   complete: function (res) {
                  console.log(res);
                  if(res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！'){
                      // 1、强制清空token
                      localStorage.removeItem("token");
                      // 2、强制跳转到登录页面
                      location.href = './login.html'
                  }
  
              } */

        })
    }

    // 获取用户头像和名称
    function renderAvatar(user) {
        // 获取用户名
        var name = user.nickname || user.username;
        // 设置欢迎文本
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
        // 设置头像
        if (user.user_pic !== null) {
            // 设置图片头像
            $(".layui-nav-img").attr("src", user.user_pic).show();
            $(".text-avatar").hide();
        } else {
            // 设置文本头像
            var first = name[0];
            $(".layui-nav-img").hide();
            $(".text-avatar").html(first).show();

        }

    }

    // 退出功能
    var layer = layui.layer;
    $("#btnLogOut").on("click", function () {
        layer.confirm('是否确定退出？', { icon: 3, title: '提示' }, function (index) {
            //    1、清空localstation中的token
            localStorage.removeItem("token");
            // 2、退回到login的页面
            location.href = "/login.html";
            layer.close(index);
        });
    })

})

