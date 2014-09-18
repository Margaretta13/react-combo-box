var gulp = require("gulp"),
    stylus = require("gulp-stylus"),
    karma = require("gulp-karma"),
    react = require("gulp-react"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch"),
    include = require("gulp-include"),
    jshint = require("gulp-jshint"),
    rename = require('gulp-rename'),
    jsmin = require('gulp-jsmin');

gulp.task("default", ['sources', 'lint', 'styles']);

gulp.task("lint", function(cb) {
    return gulp.src("dist/js/combobox.js")
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task("sources", function () {
    return gulp.src("src/jsx/moduleWrapper.jsx")
        .pipe(include())
        .pipe(react())
        .pipe(rename("combobox.js"))
        .pipe(gulp.dest("dist/js"))
        //and now create compiled version
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task("styles", function () {
    return gulp.src("src/styl/**/*.styl")
        .pipe(stylus())
        .pipe(concat("combobox.css"))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("watch", function () {
    watch("src/styl/**/*.styl", function (files, cb) {
        try {
            gulp.start('styles', cb);
        } catch(e){
            console.warn(e);
        }
    });
    watch("src/jsx/*.jsx", function (files, cb) {
        try {
            gulp.start('sources', cb);
        } catch(e){
            console.warn(e);
        }
    });
});

gulp.task("test", function() {
    // Be sure to return the stream
    return gulp.src("./test/spec/**/*.js")
        .pipe(karma({
            configFile: "test/karma.conf.js",
            action: "run"
        }))
        .on("error", function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});