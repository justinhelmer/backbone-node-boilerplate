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
  // along with the names of any actions and targetedActions
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
      resourcesByVersion[version][resource.resourceName] = resource;

      // Add this resource's names to the full list of available resources, if it hasn't been done
      if (typeof resources[resource.resourceName] === 'undefined') {
        resources[resource.resourceName] = {
          actions: [],
          targetedActions: []
        };
      }

      // Loop through all resource content types to generate a flat list of the
      // controller names for all actions, targeted actions associated with this resource
      _.each(_.keys(resource.api), function (standardContentType) {
        if (_.isObject(resource.api[standardContentType].actions)) {
          // Iterate through all actions for this resource
          _.each(resource.api[standardContentType].actions, function (callback, controller) {
            if (_.indexOf(resources[resource.resourceName].actions, controller) === -1) {
              // Add this controller to the list of available actions for this resource
              resources[resource.resourceName].actions.push(controller);
            }
          });
        }

        if (_.isObject(resource.api[standardContentType].targetedActions)) {
          // Iterate through all targeted actions for this resource
          _.each(resource.api[standardContentType].targetedActions, function (callback, controller) {
            if (_.indexOf(resources[resource.resourceName].targetedActions, controller) === -1) {
              // Add this controller to the list of available targeted actions for this resource
              resources[resource.resourceName].targetedActions.push(controller);
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
  _.each(resources, function (nonCrudControllers, resourceName) {
    // Store paths used for API calls in memory for easy access
    var paths = {
      // "Resource path" is used by create, and actions
      rpath : config.apiRoot + resourceName,
      // "Entity path" is used by retrieve, update, delete, and targeted actions
      epath : config.apiRoot + resourceName + '/:id',
    };

    /**
     * Set up all controllers for this particular resource
     * Controllers:
     * C, R, U, D = Create, Retrieve, Update, Delete
     * I = Index
     * A = Action
     * T = Targeted action
     */
    // (C) Create:
    app.post(paths.rpath, middleware('create', resourceName));

    // (R) Retrieve:
    app.get(paths.epath, middleware('retrieve', resourceName));

    // (U) Update:
    app.put(paths.epath, middleware('update', resourceName));

    // (D) Delete:
    app.del(paths.epath, middleware('del', resourceName));

    // (I) Index:
    app.get(paths.rpath, middleware('index', resourceName));

    // (A) Actions and (T) Targeted actions requests can be any number of methods;
    // set up express routes for each.
    _.each(nonCrudControllers, function (controllers, type) {
      // The path differs depending on the type of controller
      var path = (type === 'actions') ? (paths.rpath) : (paths.epath);

      _.each(controllers, function (controller) {
        app.get(path + '/' + controller, middleware(controller, resourceName));
        app.post(path + '/' + controller, middleware(controller, resourceName));
        app.put(path + '/' + controller, middleware(controller, resourceName));
      });
    });
  });

  var success = 'API server running at http://' + config.host + ':' + config.port;

  app.get('/', function (req, res) {
    res.send(success);
  });

  // Start the node server
  app.listen(config.port, config.host);

  // Inform user that the server started successfully
  console.log(success);
}());
