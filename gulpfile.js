"use strict";

const gulp      = require('gulp');
const plugins   = require('gulp-load-plugins')({DEBUG:true});

gulp.task('build', () => {
    return gulp.src('src/**/*.js')
    .pipe(plugins.babel({
        plugins: ['syntax-async-functions', 'transform-async-to-generator']
    }))
    .pipe(gulp.dest('lib'));
});


gulp.task('test', () => {
    return gulp.src('test/**/*Test.js', {read: false})
    .pipe(plugins.mocha({
        reporter: 'nyan',
        require: ['./test/mocha-babel'],
        timeout: 10000
    }));
});


gulp.task('testRegistrator', () => {
    return gulp.src(['test/registrator/**/*Test.js'], {read:false})
    .pipe(plugins.mocha({
        reporter: 'nyan',
        require: ['./test/mocha-babel'],
        timeout: 5000
    }))
    .on('error', plugins.util.log);
});


gulp.task('watch', () => {
    let watchedFiles = ['test/registrator/**/*Test.js', 'test/support/**/*.js', 'src/registrator/**/*.js'];
    gulp.watch(watchedFiles, ['testRegistrator']);
});


gulp.task('default', function () {
    gulp.start('watch');
});
