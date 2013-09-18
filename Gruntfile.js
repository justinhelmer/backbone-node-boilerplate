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
    var _ = require(config.client.libraryPath + '/lodash/lodash');

    _.each(tasks, function (task) {
      // Establish config for this task. Each task config is in its own file
      var init = require(config.configPath + '/' + task + '-config');
      grunt.config(task, init(args));
    });

    // Load grunt npm modules
    _.each(require('matchdep').filterDev('grunt-*'), function (moduleName) {
      // Load the npm grunt task
      grunt.loadNpmTasks(moduleName);

      if (moduleName !== 'grunt-connect-proxy') {
        // Assume the config name is everything after the string `grunt-` or `grunt-contrib`.
        // e.g. `grunt-contrib-requirejs` --> `requirejs`, `grunt-node-inspector` --> `node-inspector`
        // NOTE that this may not always be the case
        var configName = moduleName.replace('grunt-contrib-', '').replace('grunt-', '');

        // Require the appropriate configuration for this npm task
        var init = require(config.configPath + '/' + configName + '-config');
        grunt.config(configName, init(args));
      }
    });

    // Prepare an object of external (non-npm) tasks
    var tasks = {
      // module => config
      'sass-directory-imports' : 'sass-directory-imports',
      'generate-views-list' : 'generate-views-list'
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
      'requirejs:dist',
      'generate-views-list',
      'includes',
      'compass:dist',
      'clean:dist'
    ]);

    // Register custom build task that builds dev without launching server
    grunt.registerTask('prepareBuild:dev', 'Run dev build process', [
      'jshint:dev',
      'sass-directory-imports',
      'handlebars:dist', // App currently doesn't work unless templates are already compiled.
      'copy:dev',
      'generate-views-list',
      'includes',
      'compass:dev',
      'clean:dev'
    ]);

    // Run concurrent:dev and launch browser
    grunt.registerTask('server:dev', 'Run concurrent:dev', [
      'concurrent:devBrowser'
    ]);

    // Run concurrent:dist and launch browser
    grunt.registerTask('server:dist', 'Run concurrent:dist', [
      'concurrent:distBrowser'
    ]);

    // Register build task that will run both dev and dist builds
    grunt.registerTask('build', 'build dev and dist', [
      'build:dist', // running 'dist' first, since 'dev' has a blocking watch task
      'build:dev'
    ]);

    // Register default task for when no task is supplied
    grunt.registerTask('default', 'run grunt build', [
      'build'
    ]);
  };
}());
