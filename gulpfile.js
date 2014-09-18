var gulp = require("gulp"),
    stylus = require("gulp-stylus"),
    karma = require("gulp-karma"),
    react = require("gulp-react"),
    exec = require("child_process").exec,
    path = require("path"),
    concat = require("gulp-concat"),
    watch = require("gulp-watch");

gulp.task("default", function() {

});

gulp.task("lint", function(cb) {
    //as gulp-jsxhint dont exist for a while, use it directly
    var pathToJsxhint = path.resolve("", "./node_modules/.bin/jsxhint");

    exec(pathToJsxhint + " src/jsx/**.jsx", function (err, stdout) {
        console.log(stdout);
        cb(err);
    });
});

gulp.task("sources", function () {
    return gulp.src("src/jsx/*.jsx")
        .pipe(react())
        .pipe(concat("combobox.js"))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("styles", function () {
    return gulp.src("src/styl/**/*.styl")
        .pipe(stylus())
        .pipe(concat("combobox.css"))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("watch", function () {
    watch("src/styl/**/*.styl", function (files, cb) {
        gulp.start('styles', cb);
    });
    watch("src/jsx/*.jsx", function (files, cb) {
        gulp.start('sources', cb);
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