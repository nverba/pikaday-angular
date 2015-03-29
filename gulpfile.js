var browserify = require('browserify');
var gulp       = require('gulp');
var transform  = require('vinyl-transform');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');

var paths = {
  css: ["node_modules/pikaday-angular/node_modules/pikaday/css/pikaday.css"]
};

gulp.task('javascript', function () {
  // transform regular node stream to gulp (buffered vinyl) stream
  var browserified = transform(function(filename) {
    var b = browserify({entries: filename, debug: true});
    return b.bundle();
  });

  return gulp.src('./main.js')
    .pipe(browserified)
        // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('css', function () {

  return gulp.src(paths.css)
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./dist/css/'));
});
