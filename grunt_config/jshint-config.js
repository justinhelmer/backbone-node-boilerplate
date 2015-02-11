/**
 * @file jshint-config.js
 * Holds the configuration options for the grunt-contrib-jshint plugin
 *
 * @author Justin Helmer 10/18/2014
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      dev: {
        options: {
          camelcase: true,
          curly: true,
          eqeqeq: true,
          indent: 2,
          newcap: true,
          quotmark: 'single',
          strict: true
        },
        src: [
          'Gruntfile.js',
          'grunt_config/*',
          '<%= client.scriptPath %>/*.js',
          '<%= client.scriptPath %>/router/*.js',
          '<%= client.scriptPath %>/router/**/*.js',
          '<%= client.scriptPath %>/models/*.js',
          '<%= client.scriptPath %>/views/*.js',
          '<%= client.scriptPath %>/views/**/*.js',
          '<%= client.scriptPath %>/collections/*.js',
          '<%= client.scriptPath %>/utils/*.js',
          '<%= client.scriptPath %>/utils/**/*.js',
          '<%= server.rootPath %>/*.js'
        ]
      }
    };
  };
}());
