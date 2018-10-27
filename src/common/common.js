define(["jquery", 'modal', 'layui', 'goTop'], function() {
    //返回顶部
    var nPageH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    $('#totop').goTop({
        dis: nPageH - 100
    });
    $('.wap-back').goTop({
        dis: nPageH
    });

});