(function (grunt) {
  'use strict';

  module.exports = function(grunt) {
    var config = require('./grunt-config.js');
    var args = {
      browser: grunt.option('browser') || false
    };

    // initialize project configuration for use elsewhere
    grunt.initConfig(config);

    // Include lodash (underscore) for their nice utility functions
    var _ = require(config.client.libraryPath + '/lodash/dist/lodash');

    _.each(tasks, function (task) {
      // Establish config for this task. Each task config is in its own file
      var init = require(config.configPath + '/' + task + '-config');
      grunt.config(task, init(args));
    });

    // Load grunt npm modules
    _.each(require('matchdep').filterAll('grunt-*'), function (moduleName) {
      var configName;

      // Load the npm grunt task
      grunt.loadNpmTasks(moduleName);

      if (moduleName === 'grunt-requirejs-config') {
        configName = 'requirejsconfig';
      }
      else {
        // Assume the config name is everything after the string `grunt-` or `grunt-contrib`.
        // e.g. `grunt-contrib-requirejs` --> `requirejs`, `grunt-node-inspector` --> `node-inspector`
        // NOTE that this may not always be the case
        configName = moduleName.replace('grunt-contrib-', '').replace('grunt-', '');
      }

      // Require the appropriate configuration for this npm task
      var init = require(config.configPath + '/' + configName + '-config');
      grunt.config(configName, init(args));
    });

    // Prepare an object of external (non-npm) tasks
    var tasks = {
      // module => config
      'sass-directory-imports' : 'sass-directory-imports',
      'generate-route-handlers' : 'generate-route-handlers'
    };

    // Load the non-npm grunt tasks
    grunt.loadTasks(config.tasksPath);

    // Require the approriate configuration for each non-npm task
    _.each(tasks, function (configName, moduleName) {
      var init = require(config.configPath + '/' + configName + '-config');
      grunt.config(configName, init(args));
    });

    // Register custom dev build task
    grunt.registerTask('build:dev', 'Run dev build process and launch node server', [
      'prepareBuild:dev',
      'concurrent:dev'
    ]);

    // Register custom dist build task
    grunt.registerTask('build:dist', 'Run dist build process', [
      'clean:buildPrepare',
      'sass-directory-imports',
      'handlebars:dist',
      'requirejsconfig:dev',
      'requirejs:dist',
      'generate-route-handlers',
      'sass:dev',
      'clean:dist'
    ]);

    // Register custom build task that builds dev without launching server
    grunt.registerTask('prepareBuild:dev', 'Run dev build process', [
      'jshint:dev',
      'sass-directory-imports',
      'copy:dev',
      'handlebars:dist',
      'generate-route-handlers',
      'sass:dev',
      'requirejsconfig:dev'
    ]);

    // Run concurrent:dev and launch browser
    grunt.registerTask('server:dev', 'Run concurrent:dev', [
      'concurrent:devBrowser'
    ]);

    // Run concurrent:dist and launch browser
    grunt.registerTask('server:dist', 'Run concurrent:dist', [
      'concurrent:distBrowser'
    ]);

    grunt.registerTask('build', 'build dev and dist', [
      // disabling dist for now, as it is not set up
      //'build:dist', // running 'dist' first, since 'dev' has a blocking watch task
      'build:dev'
    ]);

    grunt.registerTask('test', 'run all tests', [
      'prepareBuild:dev',
      'shell:spec'
    ]);

    // Register default task for when no task is supplied
    grunt.registerTask('default', 'run grunt build', [
      'build'
    ]);

    grunt.registerTask('heroku:deployment', 'Run dev build process for buildpack', [
      'prepareBuild:dev'
    ]);
  };
}());
