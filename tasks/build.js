import gulp from 'gulp';
import gulpSequence from 'gulp-sequence'//处理任务之间的关联关系和执行顺序

gulp.task('build',
    gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'server']));//数组代表执行一定在最后