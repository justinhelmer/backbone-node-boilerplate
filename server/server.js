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
      ep      = require('./endpoint-middleware'),
      fs      = require('fs'),
      _       = require('underscore');

  // Initialize express server
  var app = express();


  // Initialize a variable that will store each resource's name,
  // along with the names of any actions, targetedActions, and relationships
  var resources = {};

  // Initialize a variable that will store a direct reference to all active resources by version.
  // Necessary to do content negotiation in endpoint-middleware
  var resourcesByVersion = {};

  // Read the resources directory, which will have a different directory for each version
  var directory = './resources';
  fs.readdirSync(directory).forEach(function (version) {
    resourcesByVersion[version] = {};

    // Read the specific version directory, and create a reference to each resource
    fs.readdirSync(directory + '/' + version).forEach(function (filename) {
      // Initialize the particular resource
      var resource = require('./resources/' + version + '/' + filename);

      // Add a direct reference to this particular version of the resource
      resourcesByVersion[version][resource.name] = resource;

      // Add this resource's names to the full list of available resources, if it hasn't been done
      if (typeof resources[resource.name] === 'undefined') {
        resources[resource.name] = {
          actions: [],
          targetedActions: [],
          relationships: []
        };
      }

      // Loop through all resource content types to generate a flat list of the
      // controller names for all actions, targeted actions associated with this resource
      _.each(_.keys(resource.api), function (standardContentType) {
        if (_.isObject(resource.api[standardContentType].actions)) {
          // Iterate through all actions for this resource
          _.each(resource.api[standardContentType].actions, function (callback, controller) {
            if (_.indexOf(resources[resource.name].actions, controller) === -1) {
              // Add this controller to the list of available actions for this resource
              resources[resource.name].actions.push(controller);
            }
          });
        }

        if (_.isObject(resource.api[standardContentType].targetedActions)) {
          // Iterate through all targeted actions for this resource
          _.each(resource.api[standardContentType].targetedActions, function (callback, controller) {
            if (_.indexOf(resources[resource.name].targetedActions, controller) === -1) {
              // Add this controller to the list of available targeted actions for this resource
              resources[resource.name].targetedActions.push(controller);
            }
          });
        }

        if (_.isObject(resource.api[standardContentType].relationships)) {
          // Iterate through all relationships for this resource
          _.each(resource.api[standardContentType].relationships, function (callback, controller) {
            if (_.indexOf(resources[resource.name].relationships, controller) === -1) {
              // Add this controller to the list of available relationships for this resource
              resources[resource.name].relationships.push(controller);
            }
          });
        }
      });
    });
  });

  // Configure express to use certain middleware for all requests
  app.use(express.bodyParser());
  app.use(cors(config.corsOptions));

  // Prepare middleware routines with variable input
  var middleware = function(controller, resourceName) {
    return [
      ep(controller, resourceName, resourcesByVersion)
    ];
  };

  // Loop through the known active resource names and set up CRUD actions per resource
  _.each(resources, function (nonCrudControllers, name) {
    // Store paths used for API calls in memory for easy access
    var paths = {
      // "Resource path" is used by create, and actions
      rpath : config.apiRoot + name,
      // "Entity path" is used by retrieve, update, delete, and targeted actions
      epath : config.apiRoot + name + '/:id',
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
    app.post(paths.rpath, middleware('create', name));

    // (R) Retrieve:
    app.get(paths.epath, middleware('retrieve', name));

    // (U) Update:
    app.put(paths.epath, middleware('update', name));

    // (D) Delete:
    app.del(paths.epath, middleware('del', name));

    // (I) Index:
    app.get(paths.rpath, middleware('index', name));

    // (A) Actions, (T) Targeted actions, and (X) Relationship requests are all POSTs,
    // only the paths differ.
    _.each(nonCrudControllers, function (controllers, type) {
      // The path differs depending on the type of controller
      var path;
      switch (type) {
      case 'targetedActions':
      case 'relationships':
        path = paths.epath;
        break;
      case 'actions':
        path = paths.rpath;
        break;
      }

      _.each(controllers, function (controller) {
        app.post(path + '/' + controller, middleware(controller, name));
      });
    });
  });

  // Start the node server
  app.listen(config.port, config.host);

  // Inform user that the server started successfully
  console.log('Server running at http://' + config.host + ':' + config.port);
}());