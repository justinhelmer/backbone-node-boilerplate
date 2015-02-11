/**
 * @file watch-config.js
 * Holds the configuration options for the grunt-contrib-watch plugin
 *
 * @author Justin Helmer 10/18/2014
 */

(function () {
  'use strict';

  var files = [
    '<%= client.rootPath %>/*.html',
    '<%= client.rootPath %>/templates/*.html',
    '<%= client.rootPath %>/templates/**/*.html',
    '<%= client.scriptPath %>/*.js',
    '<%= client.scriptPath %>/router/*.js',
    '<%= client.scriptPath %>/router/**/*.js',
    '<%= client.scriptPath %>/models/*.js',
    '<%= client.scriptPath %>/views/*.js',
    '<%= client.scriptPath %>/views/**/*.js',
    '<%= client.scriptPath %>/collections/*.js',
    '<%= client.scriptPath %>/utils/*.js',
    '<%= client.scriptPath %>/utils/**/*.js',
    '<%= client.cssPath %>/*.scss',
    '<%= client.cssPath %>/views/**/*.scss',
    '!<%= client.cssPath %>/views/**/_all.scss',
    './spec/**/*'
  ];

  module.exports = function (args) {
    return {
      options: {
        livereload: true
      },
      dev: {
        files: files,
        tasks: ['prepareBuild:dev']
      },
      dist: {
        files: files,
        tasks: ['build:dist']
      }
    };
  };
}());
