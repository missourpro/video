// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './client/test/e2e/**/*.spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  //TODO Figure out how to launch test without live server
  baseUrl: 'http://localhost:8100/',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'client/test/e2e',
      compilerOptions: {
        module: 'commonjs',
        target: 'es6'
      },
      disableWarnings: true,
      fast: true
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
    require('jasmine-expect');
  }
};
