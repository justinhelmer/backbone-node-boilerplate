/**
 * @file connect-config.js
 * Holds the configuration options for the grunt-contrib-connect plugin
 *
 * @author Justin Helmer 8/23/2013
 */

(function () {
  'use strict';

  module.exports = {
    options: {
      port: 9001,
      keepalive: true
    },
    dev: {
      options: {
        base: 'client/build/dev'
      }
    },
    dist: {
      options: {
        base: 'client/build/dist'
      }
    }
  };
}());