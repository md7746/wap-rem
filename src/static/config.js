require.config({
    paths: {
        "jquery": ["https://cdn.bootcss.com/jquery/1.9.0/jquery.min", "libs/jquery.min"],
        'echarts': ['https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts.min', 'libs/echarts.min'],
        'layui': 'libs/layui/layui',

        "dropdown": 'libs/bootstrap/dropdown',
        "button": 'libs/bootstrap/button',
        "carousel": 'libs/bootstrap/carousel',
        "collapse": 'libs/bootstrap/collapse',
        "modal": 'libs/bootstrap/modal',
        "popover": 'libs/bootstrap/popover',
        "scrollspy": 'libs/bootstrap/scrollspy',
        "tooltip": 'libs/bootstrap/tooltip',
        "transition": 'libs/bootstrap/transition',
        "alert": 'libs/bootstrap/alert',
        "affix": 'libs/bootstrap/affix',

        "modileCode": 'libs/jquery-modile-vcode',
        "doT": ["https://cdn.bootcss.com/dot/2.0.0-beta.0/doT.min", "libs/doT.min"],
        'slide': 'libs/superslide',
        'countUp': 'libs/countUp',
        'goTop': 'libs/goTop',
        'mSlider': 'libs/mSlider.min'
    },
    shim: {
        'modileCode': ['jquery'],
        'slide': ['jquery'],
        "dropdown": ['jquery'],
        "button": ['jquery'],
        "carousel": ['jquery'],
        "collapse": ['jquery'],
        "modal": ['jquery'],
        "popover": ['jquery', 'tooltip'],
        "scrollspy": ['jquery'],
        "tooltip": ['jquery'],
        "transition": ['jquery'],
        'dropdown': ['jquery'],
        'doT': { exports: 'doT' },
        'layui': ['jquery'],
        'goTop': ['jquery']
    }
});