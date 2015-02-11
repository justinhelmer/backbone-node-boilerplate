/**
 * @file copy-config.js
 * Holds the configuration options for the grunt-contrib-copy plugin
 *
 * @author Justin Helmer 10/18/2014
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      dev: {
        files: [
          {
            // copy images
            src:  ['**'],
            dest: '<%= buildPaths.dev %>/images',
            expand: true,
            cwd: '<%= client.imgPath %>'
          },
          {
            // copy index.html
            src:  ['index.html'],
            dest: '<%= buildPaths.dev %>',
            expand: true,
            cwd: '<%= client.rootPath %>'
          },
          {
            // copy all scripts
            src:  [
              '**'
            ],
            dest: '<%= buildPaths.dev %>/js',
            expand: true,
            cwd: '<%= client.scriptPath %>'
          }
        ]
      }
    };
  };
}());
