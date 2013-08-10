/**
 * @file server.js
 * Main node server for web client.
 *
 * @author Justin Helmer 8/7/2013
 * @see node.js docs http://nodejs.org/api/
 * @see express.js docs http://expressjs.com/api.html
 */

(function () {
  'use strict';

  // Require custom configuration and contributed modules
  var config  = require('./config'),
      express = require('express'),
      cors    = require('cors'),
      fs      = require('fs'),
      _       = require('underscore');

  // Initialize express server and configure express to parse request bodies
  var app = express();
  app.use(express.bodyParser());

  // Needed to resolve client grunt server task paths.
  // @TODO is there a better way to handle path resolution?
  var prefix = '../server/';

  // Require API resources used by the node server
  // load all modules that exists in the correct API folder
  // @TODO handle versioning correctly - BAD to have a /v1/ folder
  // @see http://blog.steveklabnik.com/posts/2011-07-03-nobody-understands-rest-or-http
  var directory = prefix + 'resources/' + config.version;
  fs.readdirSync(directory).forEach(function (filename) {

    // Initialize the particular resource
    var resource = require(directory + '/' + filename);

    // Generate an array of paths used for API calls
    var paths = {
      // "Resource path" is used by create, and actions
      rpath : config.apiRoot + config.version + '/' + resource.name,
      // "Entity path" is used by retrieve, update, delete, and targeted actions
      epath : config.apiRoot + config.version + '/' + resource.name + '/:id',
    };

    /**
     * Set up all controllers for this particular resource
     * Controllers:
     * C, R, U, D = Create, Retrieve, Update, Delete
     * I = Index (can be filtered)
     * A = Action
     * T = Targeted action
     * X = Relationship request
     */
    // (C) Create:
    app.post(paths.rpath, cors(config.corsOptions), resource.api.create);

    // (R) Retrieve:
    app.get(paths.epath, cors(config.corsOptions), resource.api.retrieve);

    // (U) Update:
    app.put(paths.epath, cors(config.corsOptions), resource.api.update);

    // (D) Delete:
    app.del(paths.epath, cors(config.corsOptions), resource.api.del);

    // (I) Index:
    app.get(paths.rpath, cors(config.corsOptions), resource.api.index);

    // (A) Actions:
    if (_.isObject(resource.actions)) {
      // Iterate through all actions for this resource to set up callback triggers
      _.each(resource.api.actions, function (value, key, list) {
        app.post(paths.rpath + '/' + key, cors(config.corsOptions), value);
      });
    }

    // (T) Targeted actions:
    if (_.isObject(resource.targetedActions)) {
      // Iterate through all targeted actions to set up callback triggers
      _.each(resource.api.targetedActions, function (value, key, list) {
        app.post(paths.epath + '/' + key, cors(config.corsOptions), value);
      });
    }

    // (X) Relationship requests:
    if (_.isObject(resource.api.relationships)) {
      // Iterate through all relationship requests to set up callback triggers
      _.each(resource.api.relationships, function (value, key, list) {
        app.get(paths.epath + '/' + key, cors(config.corsOptions), value);
      });
    }
  });

  // Start the node server
  app.listen(config.port, config.host);

  // Inform user that the server started successfully
  console.log('Server running at http://' + config.host + ':' + config.port);
}());