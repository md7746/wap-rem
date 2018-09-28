var fs = require("fs");


//node.js
let join = require('path').join;

let cssPath = []; //接收css文件路径
let cssFilename = []; //接收css文件名
let lessPath = []; //接收less文件路径
let jsPath = []; //接收javascript文件路径
let mergePath = [];//接收雪碧图路径

function findSync(startPath) {
    let result = [];

    function finder(path) {
        let files = fs.readdirSync(path);
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result.map(function(item) {
        return './' + item.replace(/\\/g, '/');
    });;
}

cssPath = findSync('./src').filter(function(item) {
    return item.indexOf('css') !== -1;
});

cssPath.map((item) => {
    var a = item.split('/');
    cssFilename.push(a[a.length - 1].split('.')[0]);
})
lessPath = cssFilename.map((item) => {
    return './src/less/' + item + '.less';
});
mergePath = cssFilename.map((item) => {
    return './dest2/style/' + item + '.css';
});
jsPath = cssPath.map((item) => {
    return item.replace(/.css/, '.js');
});
 // console.log(jsPath);
/* ----------------------------------------------- 阶段一(页面制作) ----------------------------------*/
//我自己的css简写规则
function myCss(files) {
    for (var i = 0; i < files.length; i++) {
        var beforeLess = fs.readFileSync(files[i]);

        beforeLess = String(beforeLess).replace(/\s([@a-zA-Z0-9%\s#,\)\(\?_:/.-]*)\s\s;/g, "($1);")
            .replace(/{([a-z)-]*)\(/g, "{.$1(")
            .replace(/;([a-z)-]*)\(/g, ";.$1(")
            .replace(/;([a-z-]+);/g, ";.$1();")
            .replace(/;([a-z0-9-]+);/g, ";.$1();")
            .replace(/{([a-z0-9-]+);/g, "{.$1();");

        fs.writeFile('./src/less/' + cssFilename[i] + '.less', beforeLess, function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
}

var gulp = require('gulp');
var ejs = require('gulp-ejs');
var del = require('del');
var flatten = require('gulp-flatten'); //dest目标不保持目录
var less = require('gulp-less');
var browserSync = require('browser-sync').create(); //本地服务

//编译ejs
gulp.task('html', function() {
    gulp.src(['./src/*.html'])
        .pipe(ejs())
        .pipe(gulp.dest('./dest'));
});


//合并js,获得js
gulp.task('getJs', function() {
    //依赖库
    gulp.src('./libs/**/*')
        .pipe(gulp.dest('./dest/js/libs'));
    //require 配置js
    gulp.src('./src/static/config.js')
        .pipe(gulp.dest('./dest/js'));
    //自己写的js
    gulp.src(jsPath)
        .pipe(gulp.dest('./dest/js/page'));

});

//复制获得图片
gulp.task('getImg', function() {
    gulp.src('./src/*/images/*')
        .pipe(flatten())
        .pipe(gulp.dest('./dest/images'));
    gulp.src('./src/**/bg/*')
        .pipe(flatten())
        .pipe(gulp.dest('./dest/style/images'));
    gulp.src('./src/**/bg/ico/*')
        .pipe(flatten())
        .pipe(gulp.dest('./dest/style/images/ico'));
});


//合并完整的less
gulp.task('getEndLess', function() {
    myCss(cssPath);
});

//编译less,获得css
gulp.task('getCss', ['getEndLess'], function() {

    gulp.src(lessPath)
        .pipe(less())
        .pipe(flatten())
        .pipe(gulp.dest('./dest/style'));

});

//css第三方依赖
gulp.task('getLibsCss', function() {

    gulp.src('./libs/**/*.css')
        .pipe(flatten())
        .pipe(gulp.dest('./dest/style'));

});


// 构建出dest
gulp.task('build', ['getImg', 'html', 'getJs', 'getCss'], function() {
    del(['dist']);
});


gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: "./dest/"
    });

    gulp.watch('src/**/*.js', ['getJs', 'html']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.css', ['getCss', 'getImg', 'html']);
    setTimeout(()=>{
        gulp.watch("dest/*").on('change', browserSync.reload);
    },1000)
});

/* ----------------------------------------------- 阶段二(压缩合并) ----------------------------------*/
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');

/* 压缩html */
gulp.task('minhtml', function() {
    gulp.src(['./dest/**/*.html'])
        .pipe(htmlmin({
            removeComments: false, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest('./dest2'));
});

/* 压缩css 
    keepBreaks: true //保留换行
    advanced: false  //不合并选择器
    /*!   //保留注释

*/
gulp.task('mincss', function() {
    gulp.src(['./dest/**/*.css'])
        .pipe(cssmin({ compatibility: 'ie7'})) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'
        .pipe(gulp.dest('./dest2'));
});

/* 压缩js */
gulp.task('minjs', function() {
    gulp.src(['./dest/**/*.js'])
        //.pipe(uglify())
        .pipe(gulp.dest('./dest2'));
});

/* 拷贝images文件夹 */
gulp.task('copyimg', function() {
    gulp.src('./dest/images/**/*')
        .pipe(gulp.dest('./dest2/images'));
    gulp.src('./dest/style/images/**/*')
        .pipe(gulp.dest('./dest2/style/images'));
});


/* 压缩项目文件 */
gulp.task('min', ["copyimg", "minhtml", "mincss", "minjs"]);


/* ----------------------------------------------- 阶段三(背景图合并) ----------------------------------*/
var spriter = require('gulp-css-spriter'); //背景图合并——spriter

//背景图合并
gulp.task('spriter', ['copySource'], function() {

    for(var i=0;i<mergePath.length;i++){
        gulp.src(mergePath[i])
        .pipe(spriter({
            'spriteSheet': './dist/style/images/' +cssFilename[i]+ '_ico.png',
            'pathToSpriteSheetFromCSS': 'images/' +cssFilename[i]+  '_ico.png',
        }))
        .pipe(cssmin({ compatibility: 'ie7' }))
        .pipe(gulp.dest('./dist/style'));
    }

});


//复制源码
gulp.task('copySource', function() {
    return gulp.src('./dest2/**/*')
        .pipe(gulp.dest('dist'));
});


//删除合并前的背景图
gulp.task('merge', ['spriter'], function() {
    del(['dist/style/images/ico']);
    setTimeout(function() {
        del(['dest', 'dest2']);
    }, 5000);
});


gulp.task('all', function() {
    setTimeout(function() {
        gulp.start('build');
    }, 1000);
    setTimeout(function() {
        gulp.start('min');
    }, 2000);
    setTimeout(function() {
        gulp.start('merge');
    }, 3000);
});