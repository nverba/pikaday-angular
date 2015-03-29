var browserify = require('browserify');
var gulp       = require('gulp');
var transform  = require('vinyl-transform');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var markdown   = require('gulp-markdown');
var inject     = require('gulp-inject');

var paths = {
  css: ["node_modules/pikaday-angular/node_modules/pikaday/css/pikaday.css", "node_modules/github-markdown-css/github-markdown.css"]
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

gulp.task('markdown', function () {

  return gulp.src("src/*.md")
    .pipe(markdown())
    .pipe(gulp.dest('./tmp'));
  });

gulp.task('index', ['markdown'], function () {

  var target  = gulp.src('./index.html');
  var sources = gulp.src('./tmp/*.html');

  return target.pipe(inject(sources, {
    transform: function (filePath, file) {
      return file.contents.toString('utf8');
    }
  }))
  .pipe(gulp.dest('./'));
});
