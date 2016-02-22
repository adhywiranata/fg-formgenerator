var gulp = require('gulp');
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");

gulp.task('default', function() {
  // place code for your default task here
  gulp.src('dev/fg-formgenerator.css') // path to your files
    .pipe(minifyCss())
    .pipe(rename('fg-formgenerator.min.css'))
    .pipe(gulp.dest('dist/'));
  gulp.src('dev/*.js') // path to your files
    .pipe(concat('fg-formgenerator.min.js'))  // concat it
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});
