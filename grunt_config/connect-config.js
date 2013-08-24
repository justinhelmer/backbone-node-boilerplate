/**
 * @file connect-config.js
 * Holds the configuration options for the grunt-contrib-connect plugin
 *
 * @author Justin Helmer 8/23/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      options: {
        port: 9001,
        keepalive: true
      },
      dev: {
        options: {
          base: '<%= buildPaths.dev %>'
        }
      },
      dist: {
        options: {
          base: '<%= buildPaths.dist %>'
        }
      }
    };
  };
}());