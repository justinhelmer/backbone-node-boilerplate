/**
 * @file clean-config.js
 * Holds the configuration options for the grunt-contrib-clean plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      files: {
        src: ['<%= client.scriptPath %>/views.js'],
        dest: '<%= buildPaths.dev %>/js/',
        flatten: true,

        options: {
          includeRegexp: /^(\s*)\/\/#include\s+"(\S+)"\s*$/,
        }
      }
    };
  };
}());
