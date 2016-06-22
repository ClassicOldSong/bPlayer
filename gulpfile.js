const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('default', () => {
	return gulp.src('src/bplayer.js')
				.pipe(uglify())
				.pipe(rename({
					suffix: '.min'
				}))
				.pipe(gulp.dest('dist'));
});