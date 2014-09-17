var gulp = require('gulp'),
    styl = require('gulp-styl'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma'),
    react = require('gulp-react'),
    exec = require('child_process').exec,
    path = require('path');

gulp.task('default', function() {

});

gulp.task('lint', function(cb) {
    //as gulp-jsxhint dont exist for a while, use it directly
    var pathToJsxhint = path.resolve("", "./node_modules/.bin/jsxhint");

    exec(pathToJsxhint + ' src/jsx/**.jsx', function (err, stdout) {
        console.log(stdout);
        cb(err);
    });
});

gulp.task('sources', function () {
    return gulp.src('src/jsx/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function () {
    return gulp.src('src/styl/**/*.styl')
        .pipe(styl())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('test', function() {
    // Be sure to return the stream
    return gulp.src('./test/spec/**/*.js')
        .pipe(karma({
            configFile: 'test/karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});