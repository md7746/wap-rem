define(["jquery", 'modal', 'dropdown', 'collapse', 'transition', 'layui', 'goTop'], function() {
    layui.use(['layer'], function() {

    });


    $('.no-data').on('click', function() {
        layer.alert('功能正在开发中，敬请期待', { icon: 2 });
        return false;
    });

    //改变窗口刷新
    $(window).resize(function(){
        location.reload();
    });

    var nPageH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //页面内容过少，底部置底
    var oFoot = $('#foot-wrap');
    setTimeout(function() {
        if (oFoot.length) {
            var footY = oFoot.offset().top;
            var footH = oFoot.height();
            if (footY < (nPageH - footH)) {
                oFoot.css({
                    position: 'fixed',
                    top: (nPageH - footH) + 'px',
                    left: 0,
                    width: '100%'
                })
            }
        }
    }, 100);


    //导航
    var nMenuIndex = $('#menu ul li.on').index();
    $('#menu ul li').click(function() {
        $(this).addClass('on').siblings().removeClass('on');
        nMenuIndex = $('#menu ul li.on').index();
    });
    $('#menu ul li').hover(function() {
        $(this).siblings().removeClass('on')
    });
    $('#menu ul').mouseleave(function() {
        $('#menu ul li').eq(nMenuIndex).addClass('on');
    });

    //返回顶部
    $('#totop').goTop({
        dis: nPageH - 100
    });

    //侧栏显示与隐藏
    $(document).on('mouseenter', '.return-share', function() {
        var _obj = $('.return-share-triangle');
        var _nobj = $('.return-share-layer');
        $(this).find(_obj).show();
        $(this).find(_nobj).show();
    });
    $(document).on('mouseleave', '.return-share', function() {
        var _obj = $('.return-share-triangle');
        var _nobj = $('.return-share-layer');
        $(this).find(_obj).hide();
        $(this).find(_nobj).hide();
    });

});