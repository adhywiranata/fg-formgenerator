var gulp = require('gulp');
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var jsValidate = require('gulp-jsvalidate');
var debug = require('gulp-debug');

gulp.task('test-js', function () {
  var err = '';
	err += 'dev/fg-actions.js: ' + gulp.src('dev/fg-actions.js')
		.pipe(debug()).pipe(jsValidate()) + '\n';
  err += 'dev/fg-generators.js: ' + gulp.src('dev/fg-generators.js')
		.pipe(debug()).pipe(jsValidate()) + '\n';
  err += 'dev/fg-helpers.js: ' + gulp.src('dev/fg-helpers.js')
		.pipe(debug()).pipe(jsValidate()) + '\n';
  err += 'dev/fg-validations.js: ' + gulp.src('dev/fg-validations.js')
		.pipe(debug()).pipe(jsValidate()) + '\n';

  console.log(err);
});

gulp.task('default', function() {
  // place code for your default task here
  gulp.src('dev/fg-formgenerator.css') // path to your files
    .pipe(minifyCss())
    .pipe(rename('fg-formgenerator.min.css'))
    .pipe(gulp.dest('dist/'));
  gulp.src('dev/*.js') // path to your files
    .pipe(concat('fg-formgenerator.min.js'))  // concat it
    .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
    .pipe(gulp.dest('dist/'));
});
