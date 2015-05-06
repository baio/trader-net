var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');

gulp.task('default', function() {
    var tsResult = gulp.src(['src/**/*.ts', 'typings/**/*.ts'])
    .pipe(ts({
            sortOutput: true,
            removeComments : false,
            declarationFiles: true,
            module : 'commonjs',
            noExternalResolve: false
            }));

    tsResult.js.pipe(concat('tn.js')).pipe(gulp.dest('dist/'));
    tsResult.dts.pipe(concat('tn.d.ts')).pipe(gulp.dest('dist/definitions'));
});

gulp.task('watch', ["default"], function() {
    gulp.watch(["src/**/*.ts"], ['default']);
});

