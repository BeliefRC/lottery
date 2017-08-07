import gulp from 'gulp'; //项目总构建
import gulpif from 'gulp-if';//gulp的语句中处理if判断
import concat from 'gulp-concat';//处理文件拼接
import webpack from 'webpack';//打包
import gulpWebpack from 'webpack-stream';//流的处理
import named from 'vinyl-named';//文件重命名标志
import livereload from 'gulp-livereload';//  浏览器热更新
import plumber from 'gulp-plumber'//处理文件信息流
import rename from 'gulp-rename';//对文件重命名
import uglify from 'gulp-uglify';//处理js，css资源压缩
import {log, colors} from 'gulp-util'//在命令行工具输出的工具
import args from './until/args'; //命令行参数解析

//api:gulp.task>>>创建脚本变异任务,第一份参数代表任务名称
gulp.task('scripts', () => {
    return gulp.src(['app/js/index.js'])//api:gulp.src>>>打开此路径下的文件
        .pipe(plumber({
            errorHandler: function () {
                //集中处理错误，改变默认处理错误机制
            }
        }))
        .pipe(named())//文件重命名
        .pipe(gulpWebpack({//对js编译
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                }]
            }
        }), null, (err, stats) => {//第二个参数默认为null，第三个参数处理错误
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest('server/public/js'))//api:gulp.dest>>>指令编译好文件的存放路径
        .pipe(rename({
            basename: 'cp',
            extname: '.min.js'
        }))//重命名,方便开发者，用户识别文件
        .pipe(uglify({
            compress: {
                properties: false,
                output: {'quote_keys': true}
            }
        }))//文件压缩
        .pipe(gulp.dest('server/public/js'))//存储文件
        .pipe(gulpif(args.watch, livereload()))//监听文件实现热更新
});