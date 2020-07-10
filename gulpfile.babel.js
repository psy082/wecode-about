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
  js: {
    watch: "src/js/**/*.js",
    src: [webpackConfig.entry.animation, webpackConfig.entry.slider],
    dest: webpackConfig.output.path
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
  .src(routes.js.src)
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(routes.js.dest));

const webserver = () =>
  gulp.src("dist").pipe(ws({
    livereload: true,
    open: true
  }));

const styles = () =>
  gulp
  .src(routes.scss.src)
  .pipe(sass().on("error", sass.logError))
  .pipe(csso())
  .pipe(gulp.dest(routes.scss.dest));

const watch = () => {
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.templates.watch, copyTemplates);
  gulp.watch(routes.js.watch, gulpWebpack);
};

const prepare = gulp.series([clean, img, copyTemplates]);

const assets = gulp.series([styles, gulpWebpack]);

const live = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, live]);

export const build = gulp.series([prepare, assets]);