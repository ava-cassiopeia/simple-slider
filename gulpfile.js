const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

gulp.task("default", ["build-js"], function() {});

gulp.task("build-js", function() {
    return gulp.src("src/SimpleSlider.js")
        .pipe(uglify())
        .pipe(rename("simple-slider.min.js"))
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("watch", function() {
    gulp.watch(["src/SimpleSlider.js"], ["build-js"]);
});