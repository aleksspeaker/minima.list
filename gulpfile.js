var gulp = require('gulp');
var clean = require('gulp-clean');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

gulp.task('clean', function(){
  return gulp.src('dest')
             .pipe(clean());
});

gulp.task('html', function() {
  return gulp.src('src/*.pug')
             .pipe(pug({
               verbose: true,
               pretty: true}))
             .pipe(gulp.dest('dest'))
});

gulp.task('css', function() {
  return gulp.src('src/sass/*.sass')
             .pipe(sass().on('error', sass.logError))
             .pipe(autoprefixer())
             .pipe(gulp.dest('dest/css'))
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
             .pipe(gulp.dest('dest/js'))
});

gulp.task('watch', function() {
  gulp.watch('src/*.pug', ['html']);
  gulp.watch('src/sass/*.sass', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch(['dest/js/*.*', 'dest/*.*'], browserSync.reload)
})

gulp.task('browserSync', function() {
  browserSync({server:{baseDir: 'dest/'}});
});

gulp.task('default', function(callback){
  runSequence('clean', ['html', 'css', 'js', 'browserSync'], 'watch',
              callback);
});
