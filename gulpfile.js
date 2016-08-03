var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('jsmin', function(){
    gulp.src(['src/jquery.citypicker.js', 'src/areaData.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dest/'));
});