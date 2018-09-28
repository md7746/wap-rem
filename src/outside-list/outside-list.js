require.config({
    baseUrl: 'js'
});

require(["jquery",'countUp', 'page/common'], function() {

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
});