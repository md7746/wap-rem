require.config({
    baseUrl: '/js'
});

require(["jquery", 'slide', 'countUp', 'page/common'], function() {

    //总成交额nnnn元
    var options = {  
        useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
    };
    var demo = new CountUp('today-e', 0, 4833, 0, 2.5, options);
    if (!demo.error) {  
        demo.start();
    } else {  
        console.error(demo.error);
    }

    //成交数据滚动
    var nScrollItem = $("#B2").find('tr').length;
    if (nScrollItem > 4) {
        $("#B1").slide({
            mainCell: "#B2",
            autoPlay: true,
            effect: "topMarquee",
            vis: 1,
            interTime: 50
        });
    }

    // 自定义交易滚动
    var nPageW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var screenXs = 480,
        screenSm = 768,
        screenMd = 992,
        screenLg = 1200;
    if (nPageW >= screenLg) { //12
        jQuery(".zdjy").slide({
            mainCell: ".zdjy-con ul",
            autoPage: true,
            effect: "leftLoop",
            autoPlay: true,
            vis: 1,
            scroll: 1,
            prevCell: ".fa-chevron-circle-left",
            nextCell: ".fa-chevron-circle-right"
        });
    } else if (nPageW >= screenMd) { //9

    } else if (nPageW >= screenSm) { //6

    } else { //3

    }


});