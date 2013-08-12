/**
 * @file foos.js
 * API for interacting with foo
 *
 * @author Justin Helmer 8/7/2013
 */

(function () {
  'use strict';

  exports.name = 'foos';

  // exports.api should be an object broken up by content type, to handle content negotiation
  exports.api = {
    json: {
      /**
       * Create a new foo, using the provided body data as the data object
       */
      create: function (req, res) {
        // Prepare parameters for database insert
        var data = req.body;

        // Insert row into the database

        // Return the result
        res.send({
          msg: 'success'
        });
      },

      /**
       * Retrieve the information for a foo with the supplied id
       */
      retrieve: function (req, res) {
        // Query the dbase
        var result = {
          id: req.params.id,
          name: 'Lorem ipsum Sint ' + req.params.id,
          description: 'Lorem ipsum Quis eu ut et tempor nulla id enim dolor do enim enim nulla. ' + req.params.id
        };

        // Return the result
        res.send(result);
      },

      /**
       * Updates the information for a foo with the supplied id,
       * using the provided body data as the update object
       */
      update: function (req, res) {
        // Prepare parameters for database update
        var id = req.params.id;
        var data = req.body;

        // Update the database

        // Return response message
        res.send({
          msg: 'success'
        });
      },

      /**
       * Deletes a foo with the supplied id
       */
      del: function (req, res) {
        var id = req.params.id;

        // Delete the foo

        // Return response message
        res.send({
          msg: 'success'
        });
      },

      /**
       * List all foos that meet the specified criteria
       * If no query is supplied, then all foos are returned.
       */
      index: function (req, res) {
        // Treat the query part of the API request as the database filter parameters
        var params = req.query;

        // Build a query that will selects foos that match the conditions
        // specified by filter parameters, and query the database
        var result = [
          {
            id: 123,
            name: 'Lorem ipsum Reprehenderit',
            description: 'Lorem ipsum Commodo eiusmod culpa culpa veniam laboris minim laboris est voluptate.'
          },
          {
            id: 234,
            name: 'Lorem ipsum Elit',
            description: 'Lorem ipsum Culpa ut ullamco ea laboris cillum sed ullamco aliqua est incididunt velit velit nulla incididunt minim nostrud.'
          },
          {
            id: 345,
            name: 'Lorem ipsum Do sint',
            description: 'Lorem ipsum Aute do ea occaecat in culpa minim deserunt est laborum est et aute nostrud sunt sint et adipisicing do.'
          },
          {
            id: 456,
            name: 'Lorem ipsum Anim laboris',
            description: 'Lorem ipsum Id exercitation do aute et aliquip id laboris exercitation ut in sed consectetur non voluptate.'
          },
          {
            id: 567,
            name: 'Lorem ipsum Velit velit ex qui dolore.',
            description: 'Lorem ipsum Pariatur magna non cupidatat in incididunt culpa id consequat sit dolor cillum officia fugiat.'
          }
        ];

        // Return the result
        res.send(result);
      },

      actions: {
        /**
         * An example of an action.
         *
         * Re-index all foos,
         * optionally using body data to pass any configuration parameters.
         */
        reindex: function (req, res) {
          // Prepare configuration parameters to determine re-index behavior
          var config = req.body;

          // Re-index all foos given the configuration parameters

          // Return the result
          res.send({
            msg: 'success'
          });
        }
      },

      targetedActions: {
        /**
         * An example of a targeted action.
         *
         * Publishes a particular foo with the supplied id,
         * using the provided body data as the publication parameters.
         */
        publish: function (req, res) {
          var id = req.params.id;

          // Prepare configuration parameters to determine publishing behavior
          var config = req.body;

          // Publish this particular foo, given the configuration parameters

          // Return the result
          res.send({
            msg: 'success'
          });
        }
      },

      relationships: {}
    }
  };
}());