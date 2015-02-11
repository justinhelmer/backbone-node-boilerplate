/**
 * @file requirejsconfig-config.js
 * Holds the configuration options for the grunt-requirejs-config plugin
 *
 * @author Justin Helmer 10/21/2014
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      dev: {
        src: '<%= client.scriptPath %>/main.js',
        dest: '<%= buildPaths.dev %>/js/main.js',
        options: {
          // @TODO scan through libs and automatically populate this list of paths
          paths: {
            'jquery': 'libs/jquery/dist/jquery',
            'URIjs': 'libs/URIjs/src',
            'lodash': 'libs/lodash/lodash',
            'backbone': 'libs/backbone/backbone',
            'handlebars': 'libs/handlebars/dist/handlebars',
            'foundation': 'libs/zurb-foundation-5/js/foundation/foundation',
            'webshims': 'vendor/js-webshim/polyfiller',
            'jquery.cookie': 'libs/jquery.cookie/jquery.cookie'
          },
          map: {
            '*': {
              underscore: 'lodash' // backbone requires "underscore" but prefer lodash
            }
          },
          shim: {
            backbone: {
              deps: ['underscore', 'jquery'],
              exports: 'Backbone'
            },
            webshims: {
              deps: ['jquery'],
              exports: 'webshims'
            }
          }
        }
      }
    };
  };
}());
