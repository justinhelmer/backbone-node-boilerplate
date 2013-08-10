/**
 * @file requirejs-config.js
 * Holds the configuration options for the grunt-contrib-requirejs plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = {
    options: {
      appDir: '<%= client.rootPath %>',
      baseUrl: './js',
      name: 'main',
      mainConfigFile: '<%= client.scriptPath %>/main.js',
      skipDirOptimize: true
    },
    dist: {
      options: {
        dir: '<%= buildPaths.dist %>',
        optimize: 'uglify2',
        optimizeCss: 'none'
      }
    }
  };
}());