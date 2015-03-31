var browserify  = require('browserify');
var gulp        = require('gulp');
var transform   = require('vinyl-transform');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var inject      = require('gulp-inject');
var hljs        = require('highlight.js');
var map         = require('vinyl-map');

// Actual default values
var md = require('markdown-it')({
  html: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
});

var paths = {
  css: [
    "src/*.css",
    "node_modules/pikaday-angular/node_modules/pikaday/css/pikaday.css",
    "node_modules/highlight.js/styles/default.css"
  ],
  md: "src/*.md",
  js: "./main.js"
};

gulp.task('javascript', function () {
  // transform regular node stream to gulp (buffered vinyl) stream
  var browserified = transform(function(filename) {
    var b = browserify({entries: filename, debug: true});
    return b.bundle();
  });

  return gulp.src(paths.js)
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

  var markdown = map(function(code) {
    return md.render(code.toString());
  });

  return gulp.src(paths.md)
    .pipe(markdown)
    .pipe(gulp.dest('./tmp'));
});

gulp.task('index', ['markdown'], function () {

  var target  = gulp.src('./index.html');
  var sources = gulp.src('./tmp/*.md');

  return target.pipe(inject(sources, {
    transform: function (filePath, file) {
      return file.contents.toString('utf8');
    }
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.md, ['index']);
  gulp.watch(paths.js, ['javascript']);
});
