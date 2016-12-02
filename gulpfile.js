var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('default', ['sass', 'compress', 'watch']);

gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min",
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['compress']);
    gulp.watch('dist/**/*.html', function (files) {
        livereload.changed(files);
    });
    // gulp.watch('root/wp-content/themes/hypermedia/**/*.{php,js,amf,umf}', function() {
    //     return gulp.src('root/wp-content/themes/hypermedia/**/*.php').pipe(livereload());
    // });
});
