/**
 * @file sass-directory-imports-config.js
 * Holds the configuration options for the sass-directory-imports plugin
 *
 * @author Justin Helmer 8/5/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      files: {
        // All sass files that begin with "_' in cssPath will be imported into _all
        src: [
          '<%= client.cssPath %>/views/blocks/_all.scss',
          '<%= client.cssPath %>/views/pages/_all.scss',
          '<%= client.cssPath %>/views/partials/_all.scss'
        ]
      }
    };
  };
}());