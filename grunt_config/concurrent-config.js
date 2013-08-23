/**
 * @file nodemon-config.js
 * Holds the configuration options for the grunt-nodemon plugin
 *
 * @author Justin Helmer 8/10/2013
 */

(function () {
  'use strict';

  module.exports = {
    options: {
      logConcurrentOutput: true
    },
    dev: {
      tasks: ['nodemon:server', 'connect:dev', 'watch:dev']
    },
    dist: {
      tasks: ['nodemon:server', 'connect:dist', 'watch:dist']
    }
  };
}());