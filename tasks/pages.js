import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './until/args';

gulp.task('pages', () => {
    return gulp.src('app/**/*.ejs')//代表app文件夹下的所有ejs文件，层级不限
        .pipe(gulp.dest('server'))
        .pipe(gulpif(args.watch, livereload()))
});