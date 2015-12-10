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


gulp.task('default', function () {
    // default task is here
});
