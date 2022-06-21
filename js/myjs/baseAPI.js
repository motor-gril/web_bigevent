// 对每次请求url地址做一个改变
// 拼接url根路径和接口路径，下次再js文档中的url则不需要再加根路径了只需要写接口路径
$.ajaxPrefilter(function(options){
    console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求的跟路径
    options.url = 'http://www.liulongbin.top:3007'+options.url;

    // 为url中有/my/的统一配置请求头
    if(options.url.indexOf("/my/") !== -1){
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    
    // 全局配置complete方法，控制用户权限的问题
    options.complete=function (res) {
        console.log(res);
        if(res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！'){
            // 1、强制清空token
            localStorage.removeItem("token");
            // 2、强制跳转到登录页面
            location.href = './login.html'
        }

    }

})