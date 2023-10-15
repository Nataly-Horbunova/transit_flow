const gulp = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const ttf2woff2 = require('gulp-ttf2woff2');
const jsmin = require('gulp-jsmin');

function sassTask () {
    return gulp.src('./src/styles/**/*.scss', { base: 'src' })
    .pipe(concat('styles/main.css'))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: 'autoplace'}))    
    .pipe(gulp.dest('dist'));
}

function htmlTask () {
    return gulp.src('src/**/*.html', { base: 'src' })
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}


function imageTask () {
    return gulp.src('src/assets/**/**/*.+(jpg|jpeg|png|svg|gif)', { base: 'src' })
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
      ]))
		.pipe(gulp.dest('dist'))
}

function fontsTask() {
    return gulp.src('src/fonts/**/*.*', {base: 'src'})
      .pipe(ttf2woff2())
      .pipe(gulp.dest('dist'))
  }

function watchTask() {
    gulp.watch('src/styles/**/*.scss', sassTask);
    gulp.watch('src/**/*.html', htmlTask);
    gulp.watch('src/scripts/**/*.js', jsTask);

}

function cleanTask() {
    return gulp.src('dist', {allowEmpty: true, read: false})
      .pipe(clean());
  }


  function jsTask () {
    return gulp.src('src/scripts/**/*.js', { base: 'src' })
        .pipe(jsmin())
        .pipe(gulp.dest('dist'));
}


exports.sass = sassTask;
exports.html = htmlTask;
exports.watch = watchTask;
exports.images = imageTask;
exports.fonts = fontsTask;
exports.clean = cleanTask;
exports.js = jsTask;
exports.build = gulp.series(
    cleanTask,
    htmlTask,
    sassTask,
    imageTask,
    fontsTask,
    jsTask,
    watchTask);


