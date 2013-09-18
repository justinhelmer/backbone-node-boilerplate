/**
 * @file generate-views-list-config.js
 * Holds the configuration options for the generate-views-list plugin
 *
 * @author Justin Helmer 9/18/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      src: [
        '<%= client.scriptPath %>/views/blocks/*.js',
        '<%= client.scriptPath %>/views/pages/*.js',
        '<%= client.scriptPath %>/views/partials/*.js',
        '<%= client.scriptPath %>/views/layout.js'
      ],
      options: {
        outputFile: '<%= client.scriptPath %>/_views.js'
      }
    };
  };
}());
