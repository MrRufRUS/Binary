//
'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');

sass.compiler = require('node-sass');

gulp.task('compress', () => {
   return gulp.src('src/js/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
}); 

gulp.task('sass', function () {
   return gulp.src('src/sass/**/*.scss')
      .pipe(sass({
         outputStyle: 'compressed'
      }))
      .pipe(autoprefixer({cascade: true})) 
      .pipe(gulp.dest('dist/css'));
});

gulp.task('minify', () => {
   return gulp.src('src/index.html')  
      .pipe(fileinclude({
         prefix: '@@',
         basepath: '@file'
      }))
     .pipe(htmlmin({ collapseWhitespace: true }))
     .pipe(gulp.dest('dist'));   
 });



gulp.task('serve', function () {
   gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
   gulp.watch('src/js/**/*.js', gulp.series('compress'));
   gulp.watch('src/**/*.html', gulp.series('minify'));
});

 



