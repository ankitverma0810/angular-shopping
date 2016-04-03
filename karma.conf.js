module.exports = function(config) {
	config.set({
		browsers: ['PhantomJS'],
		frameworks: ['mocha'],
		preprocessors: {
			'app/**/*.js': ['coverage'] //npm install --save istanbul karma-coverage
		},
		coverageReporter: {
			includeAllSources: true,
			reporters: [{
				type: "html",
				dir: "test/coverage",
				subdir: "."
			}, {
				type: "text" //format in which you want to see the istanbul report
			}]
		},
		files: [
			"bower_components/angular/angular.js",
			"bower_components/angular-mocks/angular-mocks.js",
			"bower_components/chai/chai.js",
			"app/**/*.js",
			"test/!(protractor.config).js"
		]
	})
}