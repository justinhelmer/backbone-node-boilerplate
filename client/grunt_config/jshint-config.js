/**
 * @file jshint-config.js
 * Holds the configuration options for the grunt-contrib-jshint plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = {
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
        '!<%= client.scriptPath %>/templates.js',
        '<%= client.scriptPath %>/models/*.js',
        '<%= client.scriptPath %>/views/*.js',
        '<%= client.scriptPath %>/views/**/*.js',
        '<%= client.scriptPath %>/collections/*.js',
        '<%= client.scriptPath %>/utils/*.js',
        '<%= server.rootPath %>/*.js',
        '<%= server.rootPath %>/resources/**/*.js',
      ]
    }
  };
}());