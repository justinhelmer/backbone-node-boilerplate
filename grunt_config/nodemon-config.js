/**
 * @file nodemon-config.js
 * Holds the configuration options for the grunt-nodemon plugin
 *
 * @author Justin Helmer 10/18/2014
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          cwd: '<%= server.rootPath %>',
          watch: ['*.js']
        }
      },
      dist: {
        script: 'server.js',
        options: {
          file: 'server.js',
          cwd: '<%= server.rootPath %>'
        }
      }
    };
  };
}());
