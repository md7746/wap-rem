(function($){

    /*
    **************************************************
    *
    *  手机验证码插件
    *  param: 
    *     data-flag - 置0，选择图片后不出现新的上传框，置1，选择后出现新上传框 
    *
    **************************************************
    */
    $.fn.modileCode = function(options,fn) {
        var settings = {
            inputVerily : false,   //是否启用表单验证
            verilyFunction : function(obj){  //表单验证函数，必须配置inputVerily为true
                var flag;
                flag = obj.parent().prev().val() != ""&&obj.parent().prev().val() != obj.parent().prev().attr("placeholder");
                return flag;
            },
            count      : 120,  //间隔函数，1秒执行
    	};
        
		return this.each(function() { //此处this表示jquery对象而非dom对象，return返回 this.each()的原因在于，返回jquery对象方便链式调用。
			// 如果存在选项，则合并之
			if (options) {
				$.extend(settings, options);
			}    
            var InterValObj; //timer变量，控制时间
            var curCount;//当前剩余秒数
            var mainObj = $(this); //验证码 input对象
            
            $(this).on('click',function(e){
                if(settings.inputVerily){
                    if(settings.verilyFunction($(this))){
                        sendMessage(fn);
                    }
                } else {
                    sendMessage(fn);
                }
            });

            function sendMessage(fn) {
                 curCount = settings.count;
                 //设置button效果，开始计时
                 mainObj.removeClass("againVerify");
                 mainObj.addClass("verifying");
                 mainObj.attr("disabled", "true");
                 mainObj.val(curCount + "s");
                 InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
                
                if( fn !== "undefind"){
                    if( typeof fn == "function"){
                       fn();
                    }
                }
                
            }

            //timer处理函数
            function SetRemainTime() {
                if (curCount == 0) {                
                    window.clearInterval(InterValObj);//停止计时器
                    mainObj.removeAttr("disabled");//启用按钮
                    mainObj.val("重新获取");
                    mainObj.removeClass("verifying");
                    mainObj.addClass("againVerify");
                    $(".comm-verilyBtn-shade").css("display","none");
                }
                else {
                    curCount--;
                    mainObj.val(curCount + "s");
                }
            }
        });
    }
})(jQuery);