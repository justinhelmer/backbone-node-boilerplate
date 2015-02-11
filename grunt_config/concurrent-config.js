/**
 * @file nodemon-config.js
 * Holds the configuration options for the grunt-nodemon plugin
 *
 * @author Justin Helmer 10/18/2014
 */

(function () {
  'use strict';

  module.exports = function (args) {
    var allTasks = {
      dev: ['nodemon:dev', 'watch:dev'],
      dist: ['nodemon:dist', 'watch:dist'],
      devBrowser: ['nodemon:dev', 'open', 'watch:dev'],
      distBrowser: ['nodemon:dist', 'open', 'watch:dist']
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
