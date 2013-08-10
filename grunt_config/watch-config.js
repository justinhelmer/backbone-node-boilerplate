/**
 * @file watch-config.js
 * Holds the configuration options for the grunt-contrib-watch plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = {
    server: {
      files: ['server.js'],
      tasks: ['server']
    }
  };
}());