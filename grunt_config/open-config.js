/**
 * @file open-config.js
 * Holds the configuration options for the grunt-open plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      default: {
        path: 'http://localhost:9001/'
      }
    };
  };

}());
