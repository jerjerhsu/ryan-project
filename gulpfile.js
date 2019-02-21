var gulp         = require( 'gulp' ),                  // Gulp                
    env          = require( 'gulp-env' ),              // 
    watch        = require( 'gulp-watch' ),            // 
    livereload   = require( "gulp-livereload" ),       // 即時更新
    connect      = require('gulp-connect'),          // 例外處裡
    debug        = require( 'gulp-debug' ),
    // connect      = require( 'gulp-connect-php' ),   // PHP Server
    browserSync  = require( 'browser-sync' ).create(), // 頁面同步更新
    changed      = require( 'gulp-changed' ),          // 監聽哪些檔案更動
    gulpIf       = require( 'gulp-if' ),               // if
    path         = require('path'),                    // path
    sass         = require( 'gulp-sass' ),             // Sass               
    compass      = require( "gulp-compass" ),          // compass         
    autoprefixer = require( 'gulp-autoprefixer' ),     // 自動前綴字  
    minifyCSS    = require( 'gulp-minify-css' ),       // css壓縮       
    concat       = require( 'gulp-concat' ),           // 合併檔案  
    // jshint       = require( "gulp-jshint" ),         
    uglify       = require( 'gulp-uglify' ),           // 醜化原始碼          
    cache        = require( "gulp-cache" ),            // 快取壓縮
    plumber      = require( 'gulp-plumber' ),          // 例外處裡
    rename       = require( 'gulp-rename' ),
    merge        = require( 'merge-stream' ),
    sourcemaps   = require( 'gulp-sourcemaps' ),
    gutil        = require( 'gulp-util' ),
    // iconfont     = require( 'gulp-iconfont' ),
    notify       = require( "gulp-notify" ),
    consolidate  = require( 'gulp-consolidate' ),
    spritesmith  = require( 'gulp.spritesmith' ),
    processhtml  = require( 'gulp-processhtml' ),
    header       = require( 'gulp-header' ),
    openurl      = require( 'gulp-open' ),
    inlineCSS    = require( 'gulp-inline-css' ),
    babel        = require( 'gulp-babel' ),
    fs           = require( 'fs' ),
    // runSequence  = require( 'run-sequence' ),
    express      = require( 'express' ),
    nodemon      = require( 'gulp-nodemon' ),
    childProcess = require( 'child_process' ),
    cluster      = require( 'cluster' ), // cluter master https://codertw.com/前端開發/199088/
    cpuNums      = require( 'os' ).cpus().length, // 取得 CPU 數量，用來建立與 CPU 數量相等的 worker
    // clusterMaster = require( 'cluster-master' ),
    none;
const { series, parallel } = require('gulp')

// environment variables 
env({
    file: 'head.env.json'
});

var banner = [ 
`/*************************************************
* client:  ${process.env.CLIENT}
* project: ${process.env.PROJECT}
* date:    ${new Date().toString().split('GMT')[0]}
* copyright (c) ${new Date().getFullYear()} ${process.env.AGENCY} | ${process.env.AUTHOR}.
 *************************************************/
`
].join( '\n' );

var src = '',
    libs = '../../../../../bower_components/',
    dist = 'docs/', // 輸出位置
    path = {
        src: {
            scss: src  + 'scss/**/*.scss', 
            js: {
                origin: src  + 'js/**/*.js',
                main: [
                    src  + 'js/base.js',
                    src  + 'js/init.js',
                    // src  + 'js/api.js',
                    // src  + 'js/plugin.js',
                    // src  + 'js/canvas.js',
                    // src  + 'js/svg.js',
                    // src  + 'js/data.js',
                    src  + 'js/main.js'
                ],  
                libs: [ // 需要合併的套件們清單，順序為依序往下合併
                    libs + 'gsap/src/minified/TweenMax.min.js',
                    // libs + 'pixi/pixi.min.js',            //xxxxxxxxx
                    libs + 'vue/dist/vue.min.js', // v2.5.13
                    libs + 'jquery/dist/jquery.min.js', // v2.2.4
                    // libs + 'jquery-ui/jquery-ui.min.js', // v1.12.1
                    libs + 'hammerjs/hammer.min.js',
                    libs + 'imagesloaded/imagesloaded.pkgd.js',
                    libs + 'jQuery-viewport-checker/dist/jquery.viewportchecker.min.js',
                    // libs + 'jquery-ui-touch-punch/jquery-ui-touch-punch.min.js',
                    // libs + 'Snap.svg/dist/snap.svg-min.js', // v0.5.1
                    libs + 'slick-carousel/slick/slick.min.js',
                    // libs + 'masonry.pkgd.js',
                    // libs + 'jquery.mCustomScrollbar.js',
                    // libs + 'greensock/TweenMax.min.js',
                    // libs + 'greensock/TweenLite.min.js',
                    // libs + 'greensock/TimelineMax.min.js',
                    // libs + 'exif.js',
                ],
            },
            html: src  + 'html/**/*.html',
            img:  src + 'img/**/*.*',
            comp: src  + 'html/component/*.html',
            temp: src  + 'html/template/*.html',
        },
        dist: {
            css:  dist + 'css/',
            js:   dist + 'js/',
            data: dist + 'data/',
            html: dist,
            img:  dist + 'img/',
        }
    },
    env = {  
        mobile:    false,
        scss:      true,
        compass:   true,
        inlineCSS: false,
        minifyCSS: false,
        minifyJS:  true,
        autoprefixer: [ '> 0%' ],
        // autoprefixer: [ 'last 2 version' ]
        // autoprefixer: [ 'last 59 version' ]
    };

function serve (cb){
    connect.server({
        https: false,
        root: dist,
        port: process.env.PORT,
        livereload: true
    });
    cb();
}
// exports.serve = serve

function reload(){
    connect.reload()
}

/********** build **********/
function buildHTML(cb){
    const opts = {}
    gulp.src( path.src.html )
        .pipe( processhtml( opts ) )
        .pipe( gulp.dest( path.dist.html ) )
        .pipe( connect.reload() );
    if (typeof cb === 'function') {
        cb();
    }
}
// exports.buildHTML = buildHTML

function buildCSS(cb){
    gulp.src( path.src.scss )
        .pipe( plumber( function( error ){
            gutil.beep();
            gutil.log( gutil.colors.red( error.message ) );
            this.emit( 'end' );
        }))
        .pipe( gulpIf( env.scss, sass({ 
            outputStyle: 'expanded' 
        }).on('error', sass.logError)))
        // .pipe( gulpIf( env.compass, compass({
        //     config_file: 'config.rb',
        //     css: path.src.css,         // 輸出路徑
        //     sass: path.src.scss,       // sass路徑
        //     image: path.dist.img,      // 圖片路徑
        //     comments: false,           // 註解   
        //     sourcemap: false,          // css.map
        //     // time: true,
        //     style: 'expanded'          // nested, expanded, compact, compressed壓縮過狀態
        // })))
        .pipe( gulpIf( env.minifyCSS, minifyCSS() ) )
        .pipe( header( banner ) )
        .pipe( autoprefixer( env.autoprefixer ) )
        .pipe( gulp.dest( path.dist.css ) )
        .pipe( connect.reload() );
    console.log('scss compiled');
    if (typeof cb === 'function') {
        cb();
    }
}
// exports.buildCSS = buildCSS
function buildIMG(cb){
    gulp.src( path.src.img )
        .pipe( gulp.dest( path.dist.img ) )
        .pipe( connect.reload() );
    if (typeof cb === 'function') {
        cb();
    }
}
// exports.buildIMG = buildIMG
function buildJS(cb){
    gulp.src( [ path.src.js.origin, `!${src}js/*.js` ] )
        .pipe( debug() )
        .pipe( babel({
            // compact: true,
            babelrc: false,
            presets: [ 'env' ]
        }) )
        .pipe( header( banner ) )
        .pipe( gulp.dest( path.dist.js ) )
        .pipe( connect.reload() );
    if (typeof cb === 'function') {
        cb();
    }
}
// exports.buildJS = buildJS
function buildMainJS(cb){
    gulp.src( path.src.js.main )
        .pipe( debug() )
        .pipe( concat( 'app.js' ) )
        .pipe( babel({
            // compact: true,
            babelrc: false,
            presets: [ '@babel/env' ]
        }) )
        .pipe( header( banner ) )
        .pipe( gulp.dest( path.dist.js ) )
        .pipe( connect.reload() );
    if (typeof cb === 'function') {
        cb();
    }
}
// exports.buildMainJS = buildMainJS
function buildLibsJS(cb){
    gulp.src( path.src.js.libs )
        .pipe( debug() )
        .pipe( concat( 'libs.min.js' ) )
        // .pipe( gulpIf( env.minifyJS, uglify() ) )
        .pipe( gulp.dest( path.dist.js ) )
        .pipe( connect.reload() );
    if (typeof cb === 'function') {
        cb();
    }
}
// exports.buildLibsJS = buildLibsJS

function watching (cb){
    watch([path.src.html], buildHTML);
    watch([path.src.scss], buildCSS);
    watch([path.src.img], buildIMG);
    watch([path.src.js.origin], buildMainJS);
    watch([path.src.img], buildLibsJS);
    if (typeof cb === 'function') {
        cb();
    }
}

exports.default = series(serve, buildHTML, buildCSS, buildIMG, buildMainJS, buildLibsJS, watching);