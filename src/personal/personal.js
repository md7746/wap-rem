require.config({
    baseUrl: 'js'
});

require(["jquery", 'page/common', 'layui', 'mSlider'], function() {

    //移动端点击展示左边菜单
    var nPageW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var screenSm = 768;
    if (nPageW <= screenSm) {
        var _left = new mSlider({
            dom: ".nav-left",
            direction: "left"
        });
        $('#show-menu').on('click', function() {
            $('.nav-left').show();
            _left.open();
        })
    }


    $('#nav-left-con>li>a').on('click', function() {
        $(this).parent().siblings().removeClass('layui-nav-itemed');
    })

    //日志页面
    layui.use('form', function() {
        var form = layui.form;
        form.on('submit(formDemo)', function(data) {
            layer.msg(JSON.stringify(data.field));
            return false;
        });
    });

    layui.use('element', function() {
        var element = layui.element;
    });

    var i = 0;
    layui.use(['laypage', 'layer'], function() {
        var laypage = layui.laypage,
            layer = layui.layer;
        //总页数大于页码总数
        laypage.render({
            elem: 'demo1',
            count: 229,
            curr: 1,
            jump: function(obj) {
                $("#pageNo").val(obj.curr);
                if (i > 0) {
                    $("#logForm").submit();
                }
                i++;
            }
        });
    });
});