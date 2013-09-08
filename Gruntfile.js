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

    // Create an array of information about node_module tasks and grunt_tasks
    var tasks = [
      {
        config : 'jshint',
        module : 'grunt-contrib-jshint',
        type   : 'node'
      },
      {
        config : 'handlebars',
        module : 'grunt-contrib-handlebars',
        type   : 'node'
      },
      {
        config : 'copy',
        module : 'grunt-contrib-copy',
        type   : 'node'
      },
      {
        config : 'compass',
        module : 'grunt-contrib-compass',
        type   : 'node'
      },
      {
        config : 'requirejs',
        module : 'grunt-contrib-requirejs',
        type   : 'node'
      },
      {
        config : 'watch',
        module : 'grunt-contrib-watch',
        type   : 'node'
      },
      {
        config : 'connect',
        module : 'grunt-contrib-connect',
        type   : 'node'
      },
      {
        config : 'open',
        module : 'grunt-open',
        type   : 'node'
      },
      {
        config : 'clean',
        module : 'grunt-contrib-clean',
        type   : 'node'
      },
      {
        config : 'concurrent',
        module : 'grunt-concurrent',
        type   : 'node'
      },
      {
        config : 'nodemon',
        module : 'grunt-nodemon',
        type   : 'node'
      },
      {
        config : 'node-inspector',
        module : 'grunt-node-inspector',
        type   : 'node'
      },
      {
        config : 'sass-directory-imports',
        module : 'sass-directory-imports',
        type   : 'other'
      }
    ];

    _.each(tasks, function (task) {
      // Register the task
      if (task.type === 'node') {
        grunt.loadNpmTasks(task.module);
      }

      // Establish config for this task. Each task config is in its own file
      var init = require(config.configPath + '/' + task.config + '-config');
      grunt.config(task.config, init(args));
    });

    // Load external (non-node_module) tasks
    grunt.loadTasks(config.tasksPath);

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
      'compass:dist',
      'clean:dist'
    ]);

    // Register custom build task that builds dev without launching server
    grunt.registerTask('prepareBuild:dev', 'Run dev build process', [
      'jshint:dev',
      'sass-directory-imports',
      'handlebars:dist', // App currently doesn't work unless templates are already compiled.
      'copy:dev',
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