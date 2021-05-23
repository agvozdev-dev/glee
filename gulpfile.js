const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin')
const del = require('del')
const fileInclude = require('gulp-file-include');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
}

function images() {
  return src('src/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function cleanDist() {
  return del('dist')
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'src/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('src/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('src/css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function build() {
  return src([
    'src/css/style.min.css',
    'src/fonts/**/*',
    'src/js/main.min.js',
    'src/*.html'
  ], { base: 'src' })
    .pipe(dest('dist'))
}

function watching() {
  watch(['src/scss/**/*.scss'], styles)
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts)
  watch(['src/**/*.html']).on('change', htmlInclude)
}

function htmlInclude() {
  return src(['src/**/*.html'])
  .pipe(fileInclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.htmlInclude = htmlInclude;

exports.build   = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, htmlInclude, watching);
