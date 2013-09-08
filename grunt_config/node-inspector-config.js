/**
 * @file node-inspectorZ-config.js
 * Holds the configuration options for the grunt-node-inspector plugin
 *
 * @author Justin Helmer 9/8/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      dev: {
        options: {
          host: '127.0.0.1'
        }
      }
    };
  };
}());