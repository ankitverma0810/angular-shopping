var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	browserSync = require('browser-sync'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	karma = require('karma').Server,
	protractor = require('gulp-protractor').protractor,
	webdriver_update = require('gulp-protractor').webdriver_update;

var DEFAULT = {
	appDir: 'components',
	env: process.env.NODE_ENV || 'development'
};

DEFAULT.sassStyle = (DEFAULT.env === 'development') ? "expanded" : "compressed";
DEFAULT.outputDir = (DEFAULT.env === 'development') ?  "builds/development/" : "builds/production/";

//path of all the files
var paths = {
	vendors: [
		'bower_components/angular/angular.js',
		'bower_components/angular-cookies/angular-cookies.js',
		'bower_components/angular-sanitize/angular-sanitize.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/angular-bootstrap/ui-bootstrap.js',
		'bower_components/jquery/dist/jquery.js',
		'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
	],
	scripts: [
		DEFAULT.appDir + '/scripts/config.js',
		DEFAULT.appDir + '/scripts/**/*.js'
	],
	sass: [DEFAULT.appDir + '/sass/*.scss'],
	fonts: ['builds/development/fonts/**/*.*'],
	views: {
		main: DEFAULT.outputDir + 'index.html',
		files: [DEFAULT.outputDir + 'views/**/*.html']
	}
};

//vendors task
gulp.task('vendors', function() {
	gulp.src(paths.vendors)
		.pipe(concat('vendors.js'))
		.pipe(gulpif(DEFAULT.env === 'production', uglify()))
		.pipe(gulp.dest(DEFAULT.outputDir+'scripts'))
		.pipe(browserSync.stream());
});

//Javascript task
gulp.task('js', ['vendors'], function() {
	gulp.src(paths.scripts)
		.pipe(sourcemaps.init()) //to generate source map for all JS file for debugging
		.pipe(concat('main.js')) //concat task
		.pipe(gulpif(DEFAULT.env === 'production', uglify())) //uglify
		.pipe(sourcemaps.write()) 
		.pipe(gulp.dest(DEFAULT.outputDir+'scripts'))
		.pipe(browserSync.stream());
});

//compass task
gulp.task('compass', function() {
	gulp.src(paths.sass)
		.pipe(compass({
			sourcemap: true,
			css: DEFAULT.outputDir+'css',
			sass: DEFAULT.appDir + '/sass',
			image: DEFAULT.outputDir+'images',
			style: DEFAULT.sassStyle
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(DEFAULT.outputDir+'css'))
		.pipe(browserSync.stream());
});

//html task
gulp.task('html', function() {
	gulp.src('builds/development/**/*.html')
		.pipe(gulpif( DEFAULT.env === 'production', gulp.dest(DEFAULT.outputDir) ))
		.pipe(browserSync.stream());
});

//images task
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

//fonts task
gulp.task('fonts', function() {
	gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*')
		.pipe(gulp.dest('builds/development/fonts/bootstrap'));

	gulp.src(paths.fonts)
		.pipe(gulpif( DEFAULT.env === 'production', gulp.dest(DEFAULT.outputDir+'fonts') ));
});

//app serve and watch task
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

//test and e2e testing task starts from here
gulp.task('serve-test', function() {
	browserSync.init({
		notify: false,
		port: 8081,
		server: {
			baseDir: ["test", DEFAULT.outputDir],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});
});

gulp.task('test-browser', function(done) {
	new karma({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true,
		reporters: ['mocha', 'coverage']
	}, done).start();
});

gulp.task('serve-coverage', ['test-browser'], function() {
	browserSync.init({
		notify: false,
		port: 7777,
		server: {
			baseDir: ["test/coverage"],
		}
	});
});

// Downloads the selenium webdriver
// ensure that the driver is installed
gulp.task('webdriver_update', webdriver_update);

gulp.task('protractor', ['webdriver_update', 'serve'], function(done) {
	gulp.src(['test/e2e/*.js'])
		.pipe(protractor({
			configFile: 'test/protractor.config.js'
		}))
		.on('error', function(e) { console.log(e) })
		.on('end', done);
});

//default task
gulp.task('default', ['fonts', 'html', 'js', 'compass', 'images', 'serve']);