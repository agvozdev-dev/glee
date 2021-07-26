const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin')
const del = require('del')
const fileInclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');

const svgSprites = () => {
  return src(['src/images/icons/**.svg'])
  .pipe(cheerio({
    run: function($) {
      $('[fill]').removeAttr('fill')
      $('[stroke]').removeAttr('stroke')
      $('[style]').removeAttr('style')
    },
    parserOptions: {
      xmlMode: true
    }
  }))
  .pipe(replace('&gt;', '>'))
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('src/images'))
}

function scripts() {
  const srcGlobs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'src/js/main.js'
  ]

  return src(srcGlobs)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
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

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'dist/'
    }
  });
}

function cleanDist() {
  return del('dist')
}

//todo exclude several files
function build() {
  const srcGlobs = [
    'src/css/style.min.css',
    'src/fonts/**/*',
    'src/js/main.min.js',
    'src/**/*.json'
  ]

  return src(srcGlobs, {
    base: 'src'
  })
  .pipe(dest('dist'))
  .pipe(htmlInclude())
  .pipe(dest('dist'))
}

function watching() {
  watch(['src/**/*.scss'], styles)
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts)
  watch(['src/**/*.html']).on('change', htmlInclude)
  watch(['src/images/icons/**.svg']).on('change', svgSprites)
}

function htmlInclude() {
  return src(['src/**/*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

exports.svgSprites = svgSprites;
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.htmlInclude = htmlInclude;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, svgSprites, scripts, browsersync, htmlInclude, watching);
