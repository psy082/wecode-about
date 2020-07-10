import gulp from "gulp";
import gulpImg from "gulp-image";
import sass from "gulp-sass";
import csso from "gulp-csso";
import webpack from "webpack-stream";
import webpackConfig from "./webpack.config.js";
import ws from "gulp-webserver";
import del from "del";

sass.compiler = require("node-sass");

const routes = {
  img: {
    src: "src/img/**/*",
    dest: "dist/img",
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/*.scss",
    dest: "dist/css",
  },
  templates: {
    watch: "templates/*.html",
    src: "templates/*.html",
    dest: "dist",
  }
};

const clean = () => del(["dist"]);

const img = () =>
  gulp.src(routes.img.src).pipe(gulpImg()).pipe(gulp.dest(routes.img.dest));

const copyTemplates = () =>
  gulp.src(routes.templates.src).pipe(gulp.dest(routes.templates.dest));

const gulpWebpack = () =>
  gulp
  .src([webpackConfig.entry.animation, webpackConfig.entry.slider])
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(webpackConfig.output.path));


const styles = () =>
  gulp
  .src(routes.scss.src)
  .pipe(sass().on("error", sass.logError))
  .pipe(csso())
  .pipe(gulp.dest(routes.scss.dest));

const watch = () => {
  gulp.watch(routes.scss.watch, styles);
};

const prepare = gulp.series([clean, img, copyTemplates]);

const assets = gulp.series([styles, gulpWebpack]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);