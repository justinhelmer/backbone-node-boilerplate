/**
 * @file nodemon-config.js
 * Holds the configuration options for the grunt-nodemon plugin
 *
 * @author Justin Helmer 8/10/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    var allTasks = {
      dev: ['nodemon:server', 'connect:dev', 'watch:dev'],
      dist: ['nodemon:server', 'connect:dist', 'watch:dist'],
      devBrowser: ['nodemon:server', 'connect:dev', 'open', 'watch:dev'],
      distBrowser: ['nodemon:server', 'connect:dist', 'open', 'watch:dist']
    };

    var tasks = {
      dev: (function () {
        if (args.browser) {
          return allTasks.devBrowser;
        }

        return allTasks.dev;
      }()),
      dist: (function () {
        if (args.browser) {
          return allTasks.distBrowser;
        }

        return allTasks.dist;
      }()),
      devBrowser: allTasks.devBrowser,
      distBrowser: allTasks.distBrowser
    };

    var config = {
      options: {
        logConcurrentOutput: true
      }
    };

    for (var target in tasks) {
      config[target] = {
        tasks: tasks[target]
      };
    }

    return config;
  };
}());