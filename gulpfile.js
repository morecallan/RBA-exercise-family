"use strict"
var browserify = require('browserify');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');

// add custom browserify options here
var customOpts = {
  entries: ['./javascripts/main.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('bundle', bundle);

gulp.task('default', ['bundle', 'lint', 'watch', 'sassify']); 

gulp.task('lint', function() {
  return gulp.src('./javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sassify', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch('./js/**/*.js', ['lint']);
  gulp.watch('./scss/**/*.scss', ['sassify']);
});

// Makes watch keep watching even on JS error. 
var onError = function ( err ) {
  gutil.log( gutil.colors.green( err.message ) );
  this.emit( 'end' );
};

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'));
}