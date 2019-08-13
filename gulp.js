const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');/*it's 'gulp-nodemon' and not 'nodemon'*/


gulp.task('default', ['browser-sync'], () => {});

gulp.task('browser-sync', ['nodemon', 'sass'], () => {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        port: 5000
    });
    gulp.watch("scss/**/*.scss", ['sass']);
});

gulp.task('nodemon', (callback) => {
    let started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', () => {
        if (!started) {
            callback();
            started = true;
        }
    });
});

gulp.task('sass', function () {
    return gulp.src("scss/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});