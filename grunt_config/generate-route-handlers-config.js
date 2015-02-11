/**
 * @file generate-route-handlers-config.js
 * Dynamically create a single AMD module for all handlers
 *
 * @author Justin Helmer 10/18/2014
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      src: [
        '<%= client.scriptPath %>/router/handlers/*.js'
      ],
      options: {
        outputFile: '<%= buildPaths.dev %>/js/router/_handlers.js',
      }
    };
  };
}());

