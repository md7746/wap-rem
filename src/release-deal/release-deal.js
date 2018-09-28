require.config({
    baseUrl: 'js'
});

require(["jquery", 'echarts', 'countUp', 'page/common', 'tooltip', 'layui'], function() {
    layui.use('element', function() {
        var element = layui.element;
    });
});