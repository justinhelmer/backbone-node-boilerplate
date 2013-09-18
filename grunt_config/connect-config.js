/**
 * @file connect-config.js
 * Holds the configuration options for the grunt-contrib-connect plugin
 *
 * @author Justin Helmer 8/23/2013
 */

(function () {
  'use strict';

  module.exports = function (args) {
    return {
      options: {
        port: 9001,
        keepalive: true,
        middleware: function (connect, options) {
          var middlewares = [];

          middlewares.push(function (req, res, next) {
            if (req.url.indexOf('.') === -1) {
              // This request has no dot in the URL - not a file request.
              if (req.url !== '/') {
                // A request for a page other than the home page was made
                req.url = '/';
              }
            }

            next();
          });

          middlewares.push(connect.static(options.base));

          return middlewares;
        }
      },
      dev: {
        options: {
          base: '<%= buildPaths.dev %>'
        }
      },
      dist: {
        options: {
          base: '<%= buildPaths.dist %>'
        }
      }
    };
  };
}());
