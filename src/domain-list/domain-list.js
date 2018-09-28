require.config({
    baseUrl: 'js'
});

require(['layui','page/common'],function() {
    layui.use('element', function() {
        var element = layui.element;
    });
});