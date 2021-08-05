const { src, dest, watch, parallel, series } = require('gulp')

const scss         = require('gulp-sass')
const concat       = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const uglify       = require('gulp-uglify')
const imagemin     = require('gulp-imagemin')
const del          = require('del')
const browserSync  = require('browser-sync').create()
const fileInclude  = require('gulp-file-include')
const svgSprite    = require('gulp-svg-sprite');
const replace      = require('gulp-replace');
const cheerio      = require('gulp-cheerio');

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

function htmlInclude() {
  return src(['src/html/**/*.html'])
  .pipe(fileInclude({
    prefix: '@@',
    basepath: '@file',
  }))
  .pipe(dest('src'))
  .pipe(browserSync.stream())
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
    notify: false
  })
}

function styles() {
  return src('src/scss/style.scss')
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'src/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('src/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function build() {
  return src([
    'src/**/*.html',
    'src/fonts/**/*',
    'src/css/style.min.css',
    'src/js/main.min.js'
  ], {
    base: 'src'
  })
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['src/scss/**/*.scss', 'src/html/**/*.scss'], styles)
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts)
  watch(['src/**/*.html']).on('change', browserSync.reload)
  watch(['src/html/**/*.html'], htmlInclude)
  watch(['src/images/icons/**.svg']).on('change', svgSprites)
}

exports.htmlInclude = htmlInclude
exports.styles      = styles
exports.scripts     = scripts
exports.browsersync = browsersync
exports.watching    = watching
exports.images      = images
exports.cleanDist   = cleanDist
exports.svgSprites  = svgSprites

exports.build   = series(cleanDist, images, build)
exports.default = parallel(styles, scripts, svgSprites, htmlInclude, browsersync, watching)
