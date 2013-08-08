module.exports = function(grunt) {
  var paths = {
    applicationFolder: './app',
    scriptFolder: 'js',
    cssFolder: 'css',
    configPath: './grunt_config',
    tasksPath: './grunt_tasks',
    buildPaths: {
      dev: './build/dev',
      dist: './build/dist'
    },
  };

  paths.scriptPath = paths.applicationFolder + '/' + paths.scriptFolder;
  paths.cssPath = paths.applicationFolder + '/' + paths.cssFolder;
  paths.libraryPath = paths.scriptPath + '/libs';
  paths.templatePaths = [
    paths.applicationFolder + '/templates/*.html',
    paths.applicationFolder + '/templates/**/*.html'
  ];

  // initialize project configuration with path variable for use elsewhere
  grunt.initConfig(paths);

  // Include lodash (underscore) for their nice utility functions
  var _ = require('./' + paths.libraryPath + '/lodash/lodash');

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
    var config = require(paths.configPath + '/' + task.config + '-config');
    grunt.config(task.config, config);
  });

  // Load external (non-node_module) tasks
  grunt.loadTasks(paths.tasksPath);

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
    require('../server/server.js');
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
