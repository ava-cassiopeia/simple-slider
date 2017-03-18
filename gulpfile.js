const gulp = require("gulp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("default", ["build-js"], function() {});

gulp.task("build-js", function() {
    return gulp.src("src/SimpleSlider.js")
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename("simple-slider.min.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("build-css", function() {
    return gulp.src(["sass/*.scss", "sass/**/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("watch", function() {
    gulp.watch(["src/SimpleSlider.js"], ["build-js"]);
    gulp.watch(["sass/*.scss", "sass/**/*.scss"], ["build-css"]);
});