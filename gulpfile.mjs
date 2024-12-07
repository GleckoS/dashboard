import gulp from "gulp";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import dartSass from "sass";

const sass = gulpSass(dartSass)

const paths = {
  scss: "./src/styles/**/*.scss",
  css: "./public/css",
};

export const styles = () => {
  return gulp
    .src(paths.scss)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.css));
};

export const watch = () => {
  gulp.watch(paths.scss, styles);
};

export default gulp.series(styles, watch);
