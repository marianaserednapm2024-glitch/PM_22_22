const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// Завдання для HTML
function htmlTask() {
  return src('app/**/*.html')  // Змінив на всі HTML файли в app та підпапках
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// Завдання для SCSS
function scssTask() {
  return src('app/scss/**/*.scss')  // Змінив на всі SCSS файли
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// Завдання для JavaScript
function jsTask() {
  return src('app/js/**/*.js')  // Змінив на всі JS файли
    .pipe(dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Просте копіювання зображень
function imagesTask() {
  return src('app/img/**/*')
    .pipe(dest('dist/img'))  // Змінив на img замість imgs для консистентності
    .pipe(browserSync.stream());
}

// BrowserSync з явним вказівкам файлу
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'  // Явно вказуємо головний файл
    },
    notify: false
  });
  cb();
}

// Watch
function watchTask() {
  watch('app/**/*.html', htmlTask);
  watch('app/scss/**/*.scss', scssTask);
  watch('app/js/**/*.js', jsTask);
  watch('app/img/**/*', imagesTask);
}

// Спочатку будуємо проект, потім запускаємо сервер
exports.build = parallel(htmlTask, scssTask, jsTask, imagesTask);

exports.default = series(
  parallel(htmlTask, scssTask, jsTask, imagesTask), // Спочатку обробляємо всі файли
  browserSyncServe, // Потім запускаємо сервер
  watchTask // І починаємо стежити за змінами
);