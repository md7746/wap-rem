require.config({
    baseUrl: 'js'
});

require(["jquery", 'page/common','modileCode'], function() {
    //用的插件https:gitee.com/souvc/jquery-modile-vcode 
    $(".lr-btnSendCode").modileCode({
        inputVerily: true,
        verilyFunction: function(obj) { //表单验证函数，必须配置inputVerily为true
            if ($("#phone").val() == "") {
                layer.alert('手机不能为空', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                })
                return false;
            }
            return true;
        },
        count: 60
    }, function() {
        $.ajax({
            url: "/loginGetVeCode",
            type: "post",
            data: $("#mobileLoginForm").serialize(),
            dataType: "json",
            beforeSend: function() {

            },
            error: function() {
                layer.msg("验证码发送错误");
            },
            complete: function() {

            },
            success: function(data) {
                if (data.result == "true" || data.result == true) {
                    layer.msg(data.message);
                } else {
                    layer.msg(data.message);
                }
            }
        });
    });

    var index;

    $("#imgVerify").click(function() {
        $(this).attr("src", "/getVerify?" + Math.random());
    });
    $("#passwordBtn").click(function() {
        passwordLogin();
    })

    $("#mobileBtn").click(function() {
        mobileLogin();
    })


    function passwordLogin() {
        if ($("#username").val() == "") {
            layer.alert('登录帐号不能为空', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }
        if ($("#password").val() == "") {
            layer.alert('登录密码不能为空', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }
        $.ajax({
            url: "/doLogin",
            type: "post",
            data: $("#passwordForm").serialize(),
            dataType: "json",
            beforeSend: function() {
                index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            },
            error: function() {
                layer.msg("登录错误");
            },
            complete: function() {
                layer.close(index);
            },
            success: function(data) {
                if (data.result == "true" || data.result == true) {
                    layer.msg(data.message);
                    setTimeout("window.location.href='/member/personalIndex'", 2000)
                } else {
                    layer.msg(data.message);
                    return false;
                }
            }
        });
    }

    function mobileLogin() {
        if ($("#phone").val() == "") {
            layer.alert('手机号码不能为空', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }
        if ($("#mobileCode").val() == "") {
            layer.alert('验证码不能为空', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }
        $.ajax({
            url: "/doMobileLogin",
            type: "post",
            data: $("#mobileLoginForm").serialize(),
            dataType: "json",
            beforeSend: function() {
                index = layer.load(1, {
                    shade: [0.1, '#fff'] //0.1透明度的白色背景
                });
            },
            error: function() {
                layer.msg("登录错误");
            },
            complete: function() {
                layer.close(index);
            },
            success: function(data) {
                if (data.result == "true" || data.result == true) {
                    layer.msg(data.message);
                    setTimeout("window.location.href='/member/personalIndex'", 2000)
                } else {
                    layer.msg(data.message);
                    return false;
                }
            }
        });
    }
    document.onkeyup = function(e) {
        var code = e.charCode || e.keyCode;
        if (code == "13") {
            if ($("#Mobile").is(':hidden')) {
                passwordLogin();
            } else {
                mobileLogin();
            }
        }
    }

});