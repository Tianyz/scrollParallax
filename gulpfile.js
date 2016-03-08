var gulp = require('gulp');
var debug = require('gulp-debug');

var autoprefixer = require('gulp-autoprefixer');


/**
 * Compile less
 */
gulp.task('less', function(){
    logInfo('** less compile **');

    var less = require('gulp-less');
    var minifyCss = require('gulp-minify-css');

    var srcFile = './src/less/index.less';
    var destFolder = './dist/css/';

    return gulp.src(srcFile)
            .pipe(debug({
                title: '** less input  >> '
            }))
            .pipe(less())
            .pipe(autoprefixer({
                // Browser param ref: https://github.com/ai/browserslist#queries
                browser: ['not ie <= 8']
            }))
            .pipe(minifyCss())
            .pipe(gulp.dest(destFolder))
            .pipe(debug({
                title: '** less output << '
            }));
});


gulp.task('watch-less', function(){
    logInfo('** watch-less **');

    gulp.watch('./src/less/*', ['less']);
});


/**
 * gulp - Uglify javascript
 */
gulp.task('uglify', function(){
    var uglify = require('gulp-uglify');

    var srcFile = './src/js/index.js';

    return gulp.src(srcFile)
            .pipe(debug({
                title: '** uglify input  >> '
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js/'))
            .pipe(debug({
                title: '** uglify output << '
            }));
});


gulp.task('watch-js', function(){
    logInfo('** watch-js **');

    gulp.watch('./src/js/*', ['uglify']);
});


/**
 * logInfo - Format console output
 *
 * @param  {string} str String to output
 * @return {null}
 */
function logInfo(str){
    if(str){
        console.log('\n\n\t' + str + '\n\n');
    }
}
