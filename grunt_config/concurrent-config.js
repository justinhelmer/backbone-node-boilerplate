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
      tasks: ['nodemon:dev', 'connect:dev', 'watch:dev']
    },
    dist: {
      tasks: ['nodemon:dev', 'connect:dev']
    }
  };
}());