 'use strict';
var concat = require('gulp-concat');
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');

var sass_config = {
  includePaths: [
    'node_modules/breakpoint-sass/stylesheets/',
  ],
  production: !!util.env.production
};

gulp.task('sass', function(){
  return gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sass_config).on('error', sass.logError))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(sourcemaps.write())
    .pipe(sass_config.production ? cssmin() : util.noop())
    .pipe(gulp.dest('css'));
});

gulp.task('js', function(){
  return gulp.src('js/src/*.js')
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('js/build/'));
});

gulp.task('default', function(){
  gulp.watch('sass/**/*.scss', gulp.series('sass'));
  gulp.watch('js/src/*.js', gulp.series('js'));
});
