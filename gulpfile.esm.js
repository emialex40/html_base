import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify-es';
import sourcemaps from 'gulp-sourcemaps';
import esm from 'esm'; // Import esm module

const esmRequire = esm(module); // Create variable for use esm
sass = require('gulp-sass')(require('sass'));

// Project paths
const paths = {
    styles: {
        src: 'dev/sass/**/*.scss',
        dest: 'css/'
    },
    scripts: {
        src: 'dev/js/**/*.js',
        libs: 'dev/js/libs/**/*.js',
        dest: 'js/'
    }
};

// A tasks for compilation SASS to CSS
export function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest));
}

// A task to collect JavaScript files
export function scripts() {
    return gulp.src([paths.scripts.libs, paths.scripts.src])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scripts.dest));
}

// Tracking changes in files
export function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

// Set the default task
export default gulp.series(
    gulp.parallel(styles, scripts),
    watch
);
