/**
 * @file nodemon-config.js
 * Holds the configuration options for the grunt-nodemon plugin
 *
 * @author Justin Helmer 8/10/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      dev: {
        options: {
          file: 'server.js',
          nodeArgs: ['--debug'],
          cwd: '<%= server.rootPath %>'
        }
      },
      dist: {
        options: {
          file: 'server.js',
          cwd: '<%= server.rootPath %>'
        }
      }
    };
  };
}());