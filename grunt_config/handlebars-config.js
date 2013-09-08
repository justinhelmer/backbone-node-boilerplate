/**
 * @file handlebars-config.js
 * Holds the configuration options for the grunt-contrib-handlebars plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  var config = require('../grunt-config');
  var StringFunctions = require('.' + config.client.scriptPath + '/utils/stringFunctions');

  module.exports = function (args) {
    return {
      options: {
        amd: true,
        partialsUseNamespace: true,

        partialRegex: /.*/,
        partialsPathRegex: /\/partials\//,

        // Convert filepath to the name of the view it represents
        processName: function(filepath) {
          // Break the filepath up into an array of its parts
          var parts = filepath.split('/');

          // Extract the name from the last part of the path
          return parts.pop().replace('.html', '');
        }
      },
      dist: {
        src: '<%= client.templatePaths %>',
        dest: '<%= buildPaths.dev %>/js/templates.js'
      }
    };
  };
}());