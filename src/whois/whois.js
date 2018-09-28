require.config({
    baseUrl: 'js'
});

require(["jquery", 'page/common'], function() {

    var ymReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.(com|cn|net|cc|com\.cn|org))$/i;//(?=^.{3,255}$) 断言后面的且匹配后面的

    $("#whois-check").click(function() {
        if(!ymReg.test($('.check-input').val())){
            return;
        }else{
            $(this).next('.check-data').slideDown();
            setTimeout(function() {
                $('#foot-wrap').css({
                    'position': 'relative',
                    'top': 0
                });
            }, 200);
        }
    });

    //展开收缩原始注册信息
    $("#show-info").click(function() {
        var _this = $(this);
        var _info = _this.next('pre');
        _info.slideToggle('fast', function() {
            $('html,body').animate({
                "scrollTop": _this.offset().top + 'px'
            });
            if (_info.is(':visible')) {
                _this.text('收缩原始注册信息');
            } else {
                _this.text('展开原始注册信息');
            }
        });
    });

});