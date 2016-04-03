// An example configuration file
exports.config = {
	// The address of a running selenium server.
	//need to define if running selenium server individually.
	//otherwise mentione path of the JAR file
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	seleniumServerJar: '../node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.0.jar',

	// Capabilities to be passed to the webdriver instance.
	capabilities: {
		'browserName': 'chrome'
	},

	/*//Need to be required if running the test through protractor command only.
	//if running the task through gulp then need to specify the specs in the gulp task itself.
	specs: ['e2e/*.js'],*/

	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true, // Use colors in the command line report.
		defaultTimeoutInterval: 30000
	}
};