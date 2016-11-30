var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload')
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['sass', 'watch']);

gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/**/*.scss', ['sass']);
    // gulp.watch('root/wp-content/themes/hypermedia/**/*.{php,js,amf,umf}', function() {
    //     return gulp.src('root/wp-content/themes/hypermedia/**/*.php').pipe(livereload());
    // });
});
