/**
 * @file server.js
 * Main node server for web client.
 *
 * @author Justin Helmer 8/7/2013
 * @see node.js docs http://nodejs.org/api/
 * @see express.js docs http://expressjs.com/api.html
 */

// Require custom configuration and contributed modules
var config  = require('./config');
var express = require('express');
var fs      = require('fs');
var _       = require('underscore');

// Initialize express server and configure express to parse request bodies
var app = express();
app.use(express.bodyParser());

// Needed to resolve client grunt server task paths.
// @TODO is there a better way to handle path resolution?
var prefix = '../server/';

// Require API resources used by the node server
// load all modules that exists in the correct API folder
var directory = prefix + 'resources/' + config.endpoint;
fs.readdirSync(directory).forEach(function (filename) {
  
  // Initialize the particular resource
  var resource = require(directory + '/' + filename);

  // Generate an array of paths used for API calls
  var paths = {
    // "Resource path" is used by create, and actions
    rpath : config.apiRoot + config.endpoint + '/' + resource.name,
    // "Entity path" is used by retrieve, update, delete, and targeted actions
    epath : config.apiRoot + config.endpoint + '/' + resource.name + '/:id',
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
  app.post(paths.rpath, resource.api.create);

  // (R) Retrieve:
  app.get(paths.epath, resource.api.retrieve);

  // (U) Update:
  app.put(paths.epath, resource.api.update);

  // (D) Delete:
  app.del(paths.epath, resource.api.del);

  // (I) Index:
  app.get(paths.rpath, resource.api.index);

  // (A) Actions:
  if (_.isObject(resource.actions)) {
    // Iterate through all actions for this resource to set up callback triggers
    _.each(resource.api.actions, function (value, key, list) {
      app.post(paths.rpath + '/' + key, value);
    });
  }

  // (T) Targeted actions:
  if (_.isObject(resource.targetedActions)) {
    // Iterate through all targeted actions to set up callback triggers
    _.each(resource.api.targetedActions, function (value, key, list) {
      app.post(paths.epath + '/' + key, value);
    });
  }

  // (X) Relationship requests:
  if (_.isObject(resource.api.relationships)) {
    // Iterate through all relationship requests to set up callback triggers
    _.each(resource.api.relationships, function (value, key, list) {
      app.get(paths.epath + '/' + key, value);
    });
  }
});

// Start the node server
app.listen(config.port, config.host);

// Inform user that the server started successfully
console.log('Server running at http://' + config.host + ':' + config.port);