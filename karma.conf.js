// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [ 'jasmine' ,'jasmine-matchers' , 'angular-cli', ],
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-matchers'),
      require('karma-spec-reporter'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma')

    ],
    files: [
      { pattern: './client/test/unit/test.ts', watched: false },
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
    ],
    exclude: [
    ],
    preprocessors: {
      './client/test/unit/test.ts': ['angular-cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: 'doc/coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['spec', 'karma-remap-istanbul']
      : ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.TRAVIS?'Chrome_travis_ci': ['Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    singleRun: false
  });
};
