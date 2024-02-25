import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify-es';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import esm from 'esm'; // Імпортуємо модуль esm

const esmRequire = esm(module); // Створюємо змінну для використання esm
sass = require('gulp-sass')(require('sass'));

// Шляхи до вашого проекту
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

// Завдання для компіляції SASS до CSS
export function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(notify({ message: 'Styles task complete' }));
}

// Завдання для збору JavaScript файлів
export function scripts() {
    return gulp.src([paths.scripts.libs, paths.scripts.src])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(notify({ message: 'Scripts task complete' }));
}

// Стеження за змінами в файлах
export function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

// Встановлюємо завдання за замовчуванням
export default gulp.series(
    gulp.parallel(styles, scripts),
    watch
);
