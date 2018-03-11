/* eslint no-console: "off" */
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
// const concat = require('gulp-concat');
const bs = require('browser-sync').create();

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

gulp.task('sass', () =>
    gulp.src('./src/public/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/public/styles'))
        .pipe(bs.stream()));

gulp.task('babel', () =>
    gulp.src('./src/public/scripts/**/*.{js,jsx}')
        .pipe(sourcemaps.init())
        .pipe(babel().on('error', handleError))
        // .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/public/scripts')));

gulp.task('babel-watch', ['babel'], (done) => {
    bs.reload();
    done();
});

gulp.task('serve', ['sass', 'babel'], () => {
    bs.init({
        proxy: 'localhost:9000'
    });
    gulp.watch('./src/public/styles/*.scss', ['sass']);
    gulp.watch('./src/public/scripts/**/*.{js,jsx}', ['babel-watch']);
    gulp.watch('./build/views/*').on('change', bs.reload);
});

gulp.task('default', ['serve']);
