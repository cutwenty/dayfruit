// 引入 gulp工具
var gulp = require('gulp');

var host = 'localhost';

// 引入 gulp-webserver 模块
var webserver = require('gulp-webserver');

// 引入 css 预处理 压缩 模块
var minifyCSS = require('gulp-minify-CSS');
var scss = require('gulp-sass');

var named = require('vinyl-named');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

// 引入 gulp-sequence 模块
var sequence = require('gulp-sequence');

// 引入 fs url 模块
var fs = require('fs');
var url = require('url');

//引入 兼容浏览器的gulp-autoprefixer

var autoprefixer = require('gulp-autoprefixer');

// 引入 rev revCollector
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');


var hxhRouter = require('./mock/router/hxhRouter.js');
var wjqRouter = require('./mock/router/wjqRouter.js');
var lqRouter = require('./mock/router/lqRouter.js');
var yhwRouter = require('./mock/router/yhwRouter.js');
var zwjRouter = require('./mock/router/zwjRouter.js');

  //拷贝
gulp.task('copy-index', function() {
  gulp.src('./*.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task('copy-images', function() {
  gulp.src('./image/**/*.png')
    .pipe(gulp.dest('./dist/images/'));
});
gulp.task('webserver', function() {
  gulp.src('./')
  .pipe(webserver({
    host:host,
    port:8090,
    directoryListing:{
      enable:true,
      path:'./'
    },
    proxies: [{source: '/dayfruit', target: 'http://'+host+':8090/dist'}],
    livereload:true,
    //mock 数据
    middleware:[hxhRouter,wjqRouter,lqRouter,yhwRouter,zwjRouter]
  }))

});


// CSS预处理

var cssFiles = [
  './src/styles/usage/page/*.scss'
];
gulp.task('scss', function() {
  gulp.src(cssFiles)

  .pipe(autoprefixer({
     browsers:['>5%'],
     cascade: true,
     remove:true
  }))
  .pipe(scss().on('error',scss.logError))
  .pipe(minifyCSS())
  .pipe(gulp.dest('./dist/prd/styles/'));

});

var jsFiles = [
  './src/scripts/*.js',
  './src/scripts/utils/*.js'
];

gulp.task('packjs', function() {
  gulp.src(jsFiles)
    .pipe(named())
    .pipe(webpack({
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'imports?define=>false',
          exclude: './src/scripts/libs/*'
        }, {
          test: /\.string$/,
          loader: 'string'
        }]
      }
    }))
    .pipe(uglify().on('error', function(err) {
      console.log('\x07', err.lineNumber, err.message);
      return this.end();
    }))
    .pipe(gulp.dest('./dist/prd/scripts/'));

});

// 版本号控制
var cssDisFiles = [
  './dist/prd/styles/app.css'
];

var jsDistFiles = [
  './dist/prd/scripts/app.js'
];

gulp.task('ver', function() {
  gulp.src(cssDisFiles)
    .pipe(rev())
    .pipe(gulp.dest('./dist/prd/styles/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./dist/ver/style/'));
  gulp.src(jsDistFiles)
    .pipe(rev())
    .pipe(gulp.dest('./dist/prd/scripts/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./dist/ver/scripts/'));
});

// 修改html文件
gulp.task('html', function() {
  gulp.src(['./dist/ver/**/*', './dist/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest("./dist/"));
});
gulp.task('min', sequence('copy-index', 'ver', 'html'));

//侦测 文件变化， 执行相应任务
gulp.task('watch',function () {
  gulp.watch('./*.html',['copy-index']);
  gulp.watch('./image/**/*',['copy-images']);
  gulp.watch('./src/styles/**/*',['scss']);
  gulp.watch('./src/scripts/**/*',['packjs']);
});

gulp.task('default', ['watch', 'webserver', 'scss'], function() {
  console.log('任务队列执行完毕');
});


gulp.task('mobilAddress', function () {
  host = gulp.env.host;
});

gulp.task('mobil', ['mobilAddress', 'watch', 'webserver', 'scss'], function() {
  console.log('移动端调试任务队列执行完毕');
});
