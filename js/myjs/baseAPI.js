// 对每次请求url地址做一个改变
// 拼接url根路径和接口路径，下次再js文档中的url则不需要再加根路径了只需要写接口路径
$.ajaxPrefilter(function(options){
    console.log(options.url);
    // 在发起真正的ajax请求之前，统一拼接请求的跟路径
    options.url = 'http://www.liulongbin.top:3007'+options.url;
    
})