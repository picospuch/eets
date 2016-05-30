var gulp = require('gulp');
var tsb = require('gulp-tsb');
var rimraf = require('rimraf');

var compilation = tsb.create({
	target: 'ES5',
	module: 'amd',
	declaration: true,
  sourceMap: true,
  noImplicitAny: true
});

gulp.task('build', function () {
  return gulp.src('src/**/*.ts')
    .pipe(compilation())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function (done) {
  rimraf('dist', done);
});

var exec = require('child_process').exec;
gulp.task('test', function (cb) {
  exec('mocha test', function (err) {
    if (err) return cb(err);
    cb();
  });
});
