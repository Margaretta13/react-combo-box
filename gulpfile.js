var gulp = require('gulp'),
    styl = require('gulp-styl'),
    inline = require('rework-inline'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma');

gulp.task('default', function() {

});

gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('styles', function () {
    return gulp.src('src/styl/**/*.styl')
        .pipe(styl(inline()))
        .pipe(gulp.dest('dist'));
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