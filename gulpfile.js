var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	browserSync = require('browser-sync'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	concat = require('gulp-concat');

var DEFAULT = {
	appDir: 'components',
	env: process.env.NODE_ENV || 'development'
};

DEFAULT.sassStyle = (DEFAULT.env === 'development') ? "expanded" : "compressed";
DEFAULT.outputDir = (DEFAULT.env === 'development') ?  "builds/development/" : "builds/production/";

var paths = {
	scripts: [
		'bower_components/angular/angular.js',
		'bower_components/jquery/dist/jquery.js',
		'bower_components/bootstrap/dist/js/bootstrap.js',
		DEFAULT.appDir + '/scripts/**/*.js'
	],
	sass: [DEFAULT.appDir + '/sass/*.scss'],
	views: {
		main: DEFAULT.outputDir + 'index.html',
		files: [DEFAULT.outputDir + 'views/**/*.html']
	}
};

gulp.task('serve', function() {
	browserSync.init({
		notify: false,
		port: 8080,
		server: {
			baseDir: [DEFAULT.outputDir],
			routes: {}
		}
	});

	gulp.watch(paths.scripts, ['js']);
	gulp.watch(paths.sass, ['compass']);
	gulp.watch('builds/development/**/*.html', ['html']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('js', function() {
	gulp.src(paths.scripts)
		.pipe(concat('main.js'))
		.pipe(gulpif(DEFAULT.env === 'production', uglify()))
		.pipe(gulp.dest(DEFAULT.outputDir+'scripts'))
		.pipe(browserSync.stream());
});

gulp.task('compass', function() {
	gulp.src(paths.sass)
		.pipe(compass({
			sass: DEFAULT.appDir + '/sass',
			image: DEFAULT.outputDir+'images',
			style: DEFAULT.sassStyle
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(DEFAULT.outputDir+'css'))
		.pipe(browserSync.stream());
});

gulp.task('html', function() {
	gulp.src('builds/development/**/*.html')
		.pipe(gulpif( DEFAULT.env === 'production', gulp.dest(DEFAULT.outputDir) ))
		.pipe(browserSync.stream());
});

gulp.task('images', function() {
	gulp.src('builds/development/images/**/*.*')
		.pipe(gulpif( DEFAULT.env === 'production', imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngcrush()]
		})))
		.pipe(gulpif( DEFAULT.env === 'production', gulp.dest(DEFAULT.outputDir + 'images') ))
		.pipe(browserSync.stream());
});

gulp.task('default', ['html', 'js', 'compass', 'images', 'serve']);