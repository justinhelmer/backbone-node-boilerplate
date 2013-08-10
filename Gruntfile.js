(function (grunt) {
  'use strict';

  module.exports = function(grunt) {
    var config = require('./grunt_config/config.js');

    // initialize project configuration with path variable for use elsewhere
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
        config : 'clean',
        module : 'grunt-contrib-clean',
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
      grunt.config(task.config, require(config.configPath + '/' + task.config + '-config'));
    });

    // Load external (non-node_module) tasks
    grunt.loadTasks(config.tasksPath);

    // Register custom dev build task
    grunt.registerTask('build:dev', 'Run dev build process', [
      'jshint:dev',
      'sass-directory-imports',
      'handlebars:dist', // App currently doesn't work unless templates are already compiled.
      'copy:dev',
      'compass:dev',
      'clean:dev',
      'server'
    ]);

    // Register custom dist build task
    grunt.registerTask('build:dist', 'Run dist build process', [
      'clean:buildPrepare:dev',
      'handlebars:dist',
      'sass-directory-imports',
      'requirejs:dist',
      'compass:dist',
      'clean:dist'
    ]);

    // Register custom server task to start the node server
    grunt.registerTask('server', 'Start node server', function () {
      require(config.server.rootPath + '/server.js');
      grunt.task.run('watch:server');
    });

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