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
      server: {
        options: {
          file: 'server.js',
          cwd: '<%= server.rootPath %>'
        }
      }
    };
  };
}());