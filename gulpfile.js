var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var babelify = require("babelify");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('default', ['connect', 'build', 'less', 'watch']);

gulp.task("build", function () {
    return browserify({
        entries: ['app/javascript/grid.js']
    })
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .transform('babelify', {presets: ["es2015"]})
    .bundle()
    .pipe(source('grid.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'));
});

gulp.task("buildtests", function () {
    browserify({
        entries: ['test/tests.js']
    })
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .transform('babelify', {presets: ["es2015"]})
    .bundle()
    .pipe(source('tests.js'))
    .pipe(buffer())
    .pipe(gulp.dest('test-build'));
});

gulp.task('connect', function () {
    connect.server({
        livereload: true,
        port: 9100
    });
});

gulp.task('less', function () {
    gulp.src('app/less/*less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('reload', function () {
    gulp.src('dist/**/*')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['app/less/*less'], ['less']);
    gulp.watch(['app/javascript/*js'], ['build']);
    gulp.watch(['dist/**/*'], ['reload']);
});
