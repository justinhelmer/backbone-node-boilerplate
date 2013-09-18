/**
 * @file foos.js
 * API for interacting with foos
 *
 * @author Justin Helmer 8/4/2013
 */

(function () {
  'use strict';

  var httpHandler  = require('../../http-handler');

  exports.resourceName = 'foo';

  // exports.api should be an object broken up by content type, to handle content negotiation
  exports.api = {
    json: {
      /**
       * Create a new foo, using the provided body data as the data object
       */
      create: function (req, res) {
        httpHandler.request(req, res, {
          method: 'POST',
          mock: {
            id: 123,
            name: req.body.name,
            description: req.body.description,
          }
        });
      },

      /**
       * Retrieve the information for a foo with the supplied id
       */
      retrieve: function (req, res) {
        httpHandler.request(req, res, {
          mock: {
            id: req.params.id,
            name: 'The name of foo ' + req.params.id,
            description: 'The description for foo ' + req.params.id,
          }
        });
      },

      /**
       * Updates the information for a foo with the supplied id,
       * using the provided body data as the update object
       */
      update: function (req, res) {
        httpHandler.request(req, res, {
          method: 'PUT',
          mock: {
            success: true
          }
        });
      },

      /**
       * Deletes a foo with the supplied id
       */
      del: function (req, res) {
        httpHandler.request(req, res, {
          method: 'DELETE',
          mock: {
            success: true
          }
        });
      },

      /**
       * List all foos that meet the specified criteria
       * If no query is supplied, then all foos are returned.
       */
      index: function (req, res) {
        httpHandler.request(req, res, {
          mock: [{
            id: 1,
            name: 'The name of foo 1',
            description: 'The description for foo 1',
          },
          {
            id: 2,
            name: 'The name of foo 2',
            description: 'The description for foo 2',
          },
          {
            id: 3,
            name: 'The name of foo 3',
            description: 'The description for foo 3',
          }]
        });
      },

      /**
       * actions may have GET, PUT and POST methods. Ensure method before request.
       */
      actions: {
        /**
         * GET: Return the number of foos
         */
        count: function (req, res) {
          switch (req.method) {
          case 'GET' :
            httpHandler.request(req, res, {
              mock: 156
            });
            break;
          default:
            res.send(500, 'Bad request');
            break;
          }
        }
      },

      /**
       * targetedActions may have GET, PUT and POST methods. Ensure method before request.
       */
      targetedActions: {
        /**
         * POST: Add the supplied user to the foo
         */
        user: function (req, res) {
          switch (req.method) {
          case 'POST' :
            httpHandler.request(req, res, {
              method: 'POST',
              mock: {
                success: true
              }
            });
            break;
          default:
            res.send(406, 'The endpoint exists, but not for the requested method: ' + req.method);
            break;
          }
        }
      }
    }
  };
}());