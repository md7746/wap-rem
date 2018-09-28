+(function($) {
    $.fn.goTop = function(option) {
        var defaultOption = {
            dis: 200,
            time: 300
        };
        var _this = this;
        var userOption = $.extend({}, defaultOption, option);
        _this.hide();
        if ($(window).scrollTop() > userOption.dis) {
            _this.fadeIn();
        } else {
            _this.fadeOut();
        }
        $(window).scroll(function() {
            if ($(this).scrollTop() > userOption.dis) {
                _this.fadeIn();
            } else {
                _this.fadeOut();
            }
        });
        _this.on('click', function() {
            $('html ,body').animate({ scrollTop: 0 }, userOption.time);
            return false;
        });
    };
})(jQuery);