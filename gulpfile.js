var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min",
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src('html/**/*.{html,htm}')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    gulp.watch('js/**/*.js', gulp.series('js'));
    gulp.watch('html/**/*.{htm,html}', gulp.series('html'));
    gulp.watch('dist/**/*.html', function (files) {
        livereload.changed(files);
    });
    // gulp.watch('root/wp-content/themes/hypermedia/**/*.{php,js,amf,umf}', function() {
    //     return gulp.src('root/wp-content/themes/hypermedia/**/*.php').pipe(livereload());
    // });
});

gulp.task('default', gulp.series('sass', 'js', 'html', 'watch'));
