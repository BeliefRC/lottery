import gulp from 'gulp';
import del from 'del'
import args from './until/args';

gulp.task('clean', () => {
    return del(['server/public', 'server/views'])
});