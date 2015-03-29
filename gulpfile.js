var browserify = require('browserify');
var gulp       = require('gulp');
var transform  = require('vinyl-transform');
var uglify     = require('gulp-uglify');

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
