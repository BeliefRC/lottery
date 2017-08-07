import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server'//启动一个脚本作为服务器
import args from './until/args';

gulp.task('server', (cb) => {
    if (!args.watch) return cb();//判定是否监听
    //创建服务器，harmony:在当前目录下执行后面参数的脚本，第二个参数为脚本路径
    let server = liveserver.new(['--harmony', 'server/bin/www']);
    server.start();

    gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function (file) {
        server.notify.apply(server, [file])//告知服务器文件发生改变
    });

    //路由，接口发生变化，需要重启服务
    gulp.watch(['server/routers/**/*.js', 'server/app.js'], function () {
        server.start.bind(server)()
    })
});