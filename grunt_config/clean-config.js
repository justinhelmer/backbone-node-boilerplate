/**
 * @file clean-config.js
 * Holds the configuration options for the grunt-contrib-clean plugin
 *
 * @author Justin Helmer 10/18/2014
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      dist: [
        '<%= buildPaths.dist %>/build.txt',
        '<%= buildPaths.dist %>/css/*.scss',
        '<%= buildPaths.dist %>/css/**/*.scss',
        '<%= buildPaths.dist %>/css/.sass-cache',
        '<%= buildPaths.dist %>/css/views',
        '<%= buildPaths.dist %>/templates',
        '<%= buildPaths.dist %>/js/templates.js',
        '<%= buildPaths.dist %>/js/utils',
        '<%= buildPaths.dist %>/js/libs/*',
        '!<%= buildPaths.dist %>/js/libs/requirejs'
      ],

      // uglify2 breaks on the requirejs/tests/browsertests/onerror/parseError.js
      buildPrepare: [
        '<%= buildPaths.dist %>/*',
        '<%= client.libraryPath %>/requirejs/tests/*'
      ]
    };
  };
}());
