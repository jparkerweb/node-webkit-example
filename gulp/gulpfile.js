// ==========================================
// ===             Require                ===
// ==========================================
	var runSequence = require('run-sequence'),
		gulp = require('gulp');

	var notify = require('gulp-notify'),
		clean = require('gulp-clean'),
		gulpif = require('gulp-if'),
		rubySass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		csso = require('gulp-csso'),
		webpack = require('gulp-webpack'),
		uglify = require('gulp-uglify'),
		shell = require('gulp-shell'),
		header = require('gulp-header');
// ==========================================



// ==========================================
// ===         setup Path variables       ===
// ==========================================
	var sourcePaths = {
		SCSS: 'src/scss/**/*.scss',
		JS: 'src/js/**/*.js',
		JSBase: 'src/js/'
	};
	var destPaths = {
		BASE: '../app/',
		CSS: '../app/',
		JS: '../app/'
	};
// ==========================================



// =========================================
// ===           Enviro Variables        ===
// =========================================
	var minify = false;  // this is set to true when running the "default" task

	var pkg = require('./package.json');
	var banner = ['/**',
		' * <%= pkg.name %> - <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @license <%= pkg.license %>',
		' */',
		''].join('\n');
// =========================================



// -------------------------
// --    task: app   --
// -------------------------
gulp.task('app', function(){
	gulp.src('', {read: false})
		.pipe(shell(['nw.exe app'], 
			{
				cwd: '../'
			}
		));
});
// -------------------------



// -------------------------
// --    task: SASS       --
// -------------------------
gulp.task('sass', function (callback) {
	runSequence(
		'clean-sass',
		'build-sass',
		callback);
});
	// clean our build path
	gulp.task('clean-sass', function () {  
		return gulp.src([
				destPaths.CSS + '*.{css,css\.map}'
			], {read: false})
			.pipe(clean({force: true}));
	});
	// task: compile SASS to CSS and AutoPrefix
	gulp.task('build-sass', function () {

		return gulp.src(sourcePaths.SCSS)
			// HACK for rubySass:
			//'sourcemap=none': true
			// until pull request #114
			// https://github.com/sindresorhus/gulp-ruby-sass/pull/114
			// is merged into gulp-ruby-sass
			// this hack forces rubysass to not return source maps
			.pipe(rubySass({ style: 'expanded', 'sourcemap=none': true })).on('error', notify.onError({message: 'sass error: <%= error %>'}))
			.pipe(autoprefixer(
				{
            		browsers: ['Chrome >= 30']
            	}
            ))
			.pipe(gulpif(minify, csso()))
			.pipe(header(banner, { pkg : pkg } ))			
			.pipe(gulp.dest(destPaths.CSS));
	});



// -------------------------
// --    task: Scripts    --
// -------------------------
gulp.task('scripts', function (callback) {
	runSequence(
		'clean-scripts',
		'build-scripts',
		callback);
});
	// clean our build path
	gulp.task('clean-scripts', function () {  
		return gulp.src([
				destPaths.JS + '*.{js,js\.map}'
			], {read: false})
			.pipe(clean({force: true}));
	});
	// task: build scripts
	gulp.task('build-scripts', function () {
		return gulp.src([sourcePaths.JSBase + 'script.js'])
			.pipe(webpack({
				output: { filename: "script.js" }
			}))

			.pipe(gulpif(minify, uglify()))
			.pipe(header(banner, { pkg : pkg } ))			
			.pipe(gulp.dest(destPaths.JS));
	});



// -------------------------
// --     task: watch     --
// -------------------------
gulp.task('watch', function () {
	gulp.watch(sourcePaths.SCSS, ['sass']);
	gulp.watch(sourcePaths.JS, ['scripts']);
});




// *************************
// ** Gulp tasks meant to **
// ** be run from command **
// ** line                **
// *************************
// ** gulp OR gulp build  **
// *************************


// -------------------------
// --    task: build      --
// -------------------------
gulp.task('build', function (callback) {
	minify = true;
	runSequence(
		'sass',
		'scripts',
		callback);
});

// -------------------------
// --    task: default    --
// -------------------------
gulp.task('default', function (callback) {
	minify = false;
	runSequence(
		'sass',
		'scripts',
		'app',
		'watch',
		callback);
});