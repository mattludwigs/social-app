var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    nodemon = require("gulp-nodemon"),
    ngAnnotate = require("gulp-ng-annotate");


gulp.task("hello", function () {
  console.log("hello")
});

gulp.task("js", function () {
  gulp.src(["server/files/assets/js/main.js","server/files/assets/js/modules/**/*.js"])
    .pipe(concat("app.js"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest("server/files/assets/js"))
});

gulp.task("watch:js", ["js"], function () {
  gulp.watch("server/files/assets/js/**/*.js", ["js"]);
});

gulp.task("dev:server", function () {
  nodemon({
    script: "server/index.js",
    ext: "js",
    ignore: ["server/files/assets/**/*.js"]
  })
});

gulp.task("run", ["watch:js", "dev:server"]);