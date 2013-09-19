/**
 * @file copy-config.js
 * Holds the configuration options for the grunt-contrib-copy plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      // devOnce is run on initial build, but not on watch:dev
      devOnce: {
        files: [
          {
            // copy all scripts
            src:  ['**'],
            dest: '<%= buildPaths.dev %>/js/libs',
            expand: true,
            cwd: '<%= client.scriptPath %>/libs'
          },
          {
            // copy images
            src:  ['**'],
            dest: '<%= buildPaths.dev %>/imgs',
            expand: true,
            cwd: '<%= client.imgPath %>'
          },
          {
            // copy index.html
            src:  ['*.html'],
            dest: '<%= buildPaths.dev %>',
            expand: true,
            cwd: '<%= client.rootPath %>'
          }
        ],
      },

      // devWatch is run on every watch:dev trigger
      devWatch: {
        files: [
          {
            // copy all scripts
            src:  [
              'collections/**/*.js',
              'models/**/*.js',
              'utils/**/*.js',
              'views/**/*.js',
              '*.js',
              '!_views.js',
            ],
            dest: '<%= buildPaths.dev %>/js',
            expand: true,
            cwd: '<%= client.scriptPath %>'
          }
        ],
      }
    };
  };
}());
