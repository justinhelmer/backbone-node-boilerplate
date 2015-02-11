/**
 * @file shell-config.js
 * Holds the configuration options for the grunt-shell plugin
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      // Register a task that will launch a local mongo db server
      //mongo: {
      //  command: 'mongod --dbpath db'
      //},
      spec: {
        command: './run_specs.sh'
      }
    };
  };
}());
