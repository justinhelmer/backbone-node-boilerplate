/**
 * @file compass-config.js
 * Holds the configuration options for the grunt-contrib-compass plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = {
    options: {
      sassDir: '<%= client.cssPath %>',
    },
    dev: {
      options: {
        cssDir: '<%= buildPaths.dev %>/css',
        environment: 'development'
      }
    },
    dist: {
      options: {
        cssDir: '<%= buildPaths.dist %>/css',
        environment: 'production'
      }
    }
  };
}());