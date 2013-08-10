/**
 * @file copy-config.js
 * Holds the configuration options for the grunt-contrib-copy plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = {
    dev: {
      files: [
        {
          // copy all scripts
          src:  ['**'],
          dest: '<%= buildPaths.dev %>/js',
          expand: true,
          cwd: '<%= client.scriptPath %>'
        },
        {
          // copy index.html
          src:  ['*.html'],
          dest: '<%= buildPaths.dev %>',
          expand: true,
          cwd: '<%= client.rootPath %>'
        },
        {
          // copy images
          src:  ['imgs/*'],
          dest: '<%= buildPaths.dev %>/imgs',
          expand: true,
          cwd: '<%= client.rootPath %>'
        },
      ],
    }
  };
}());