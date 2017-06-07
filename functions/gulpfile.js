var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');

gulp.task('tsc', function () {
    return gulp.src(['!node_modules/**/*.*', './**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('./build/'));
});

gulp.task('mocha', ["tsc"], function () {
    return gulp.src(['./build/test/**/*.spec.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
        .on('error', gutil.log);
});

gulp.task("watch", function () {
    gulp.run("mocha");
    gulp.watch('./**/*.ts', ['mocha']);
});

gulp.task("build",function() {
    return gulp.src(['!node_modules/**/*.*', './**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('../functions_build/'));
});

gulp.task("default", ["watch"]);
