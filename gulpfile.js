const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


// --- HTML таска  ---
const html_task = () => {
  return src('app/*.html')
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
};

// --- SCSS таска ---
const scss_task = () => {
  return src('app/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.min.css'))
      .pipe(cssnano())
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream());
};

// --- JS таска (усі JS з компонентів) ---
const js_task = () => {
  return src('app/js/**/*.js')
      .pipe(concat('script.min.js'))
      .pipe(uglify())
      .pipe(dest('dist/js'))
      .pipe(browserSync.stream());
};

// --- Images таска ---
const img_task = () => {
  return src('app/img/**/*.{webp,png,jpg,jpeg,svg}', { encoding: false })
      .pipe(imagemin())
      .pipe(dest('dist/img'))
      .pipe(browserSync.stream());
};

// --- BrowserSync та Watch ---
const serve = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  watch('app/**/*.html', html_task);
  watch('app/**/*.scss', scss_task);
  watch('app/js/**/*.js', js_task);
  watch('app/img/**/*', img_task);
};

// --- Default таска ---
exports.default = series(
    parallel(html_task, scss_task, js_task, img_task),
    serve
);