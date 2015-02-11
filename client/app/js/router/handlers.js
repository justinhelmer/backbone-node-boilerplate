/**
 * @file router/handlers.js
 *
 * Prepare all route handlers; set up hooks, callbacks, validation, etc.
 * Handlers are dynamically registered by adding a new handler to the router/handlers folder.
 *
 * @see `handlerDefaults` below, for a definition of an individual handler, i.e. the externally acessible router.currentHandler
 * @see `routes` below, for a reference of how the handlers are sorted
 */

define([
  'backbone',
  'underscore',
  'router/_handlers',
  'router/order',
  'router/hooks'
], function(Backbone, _, handlers, order, Hooks) {
  'use strict';

  /**
   * Holds the definition for an individual route, i.e. the externally accessible router.currentHandler.
   * All of these values can be set per-handler, and some are required to be set per-handler
   */
  var handlerDefaults = {
    // REQUIRED: The name for the route handler. must be unique
    name: '',

    // REQUIRED: An array of route paths that should be processed by this handler. Uses backbone route rules
    paths: [],

    // AUTO-GENERATED: An array of regular expressions for route path matching; corresponds to paths[]
    regexp: [],

    /**
     * An array of keys required to exist in data for validation to pass. "NotFound" is displayed otherwise.
     *
     * @see callback()
     */
    requiredParams: [],

    /**
     * An array of optional keys to be included in data. Other parameters will be ignored.
     *
     * @see callback()
     */
    optionalParams: [],

    /**
     * Build a URL string for the current route, with the supplied arguments.
     *
     * {this} is a reference to the router
     *
     * @param arguments {Object} a key->value list of arguments.
     * @return url {String} a URL string, if buildUrl is successful.
     *
     * @see router.navigate() for an example of how this is used.
     */
    buildUrl: function() {
      return null;
    },

    /**
     * Allows route handlers to hook into various steps of route handler callback execution.
     *
     * Each hook can be:
     *    1) A function - the function will be directly executed
     *    2) A string - Executes a function by the same name that exists in router/hooks
     *    3) An array - multiple functions can be run for the hook.
     *                  Each item in the array should be a function or a string.
     */
    hooks: {
      /**
       * Called at the very begining of the route callback, before any data setup.
       *
       * A good use-case for preExecute is to manipulate the current route early,
       * i.e. Hooks.preExecute.convertHashbangURL() - before data is set up.
       *
       * {this} is a reference to the router
       */
      preExecute: function() { return true; },

      /**
       * Called after data is set up, right before it is validated. Gives the route
       * handler a chance to:
       *
       *       1) manipulate the data before validation/routing, or
       *       2) redirect to a new URL, either silently or also triggering router
       *
       * A good use-case for preValidate is to append information to the data object,
       * Or check for legacy data. i.e. if (data.categoryid) { data.id = data.categoryid }
       *
       * @params data {Object} a reference to the current data object. Can be changed by each preValidate hook and defaults
       *                       to the combination of the requiredParams' data and optionalParams' data, as well as facet data
       * @return false if the preValidate handler navigates with { trigger: true }, to stop execution of the current route
       *
       * {this} is a reference to the router
       */
      preValidate: function() { return true; }
    },

    /**
     * The actual callback registered to each route.
     * Can be overwritten by the handler, but HIGHLY RECOMMEND against it.
     * If overwritten, hooks are ignored, and all data must be set up, validated, and routed manually.
     *
     * {this} is a reference to the router
     */
    callback: function() {
      callback.apply(this);
    },

    /**
     * Holds information about the main content view associated with the route handler.
     *
     * Either view.ViewConstructor or view.getMainContentView() must be set up, if this handler is to route to a MainContentView.
     *    1) If getMainContentView() is set in the handler, the function should return a reference to the main content view, passing necessary data.
     *    2) If getMainContentView() is NOT set in the handler, a ViewConstructor must be supplied for setting up the view and passing the data set.
     */
    view: {
      /**
       * Used if the handler does not have specific logic around setting up a view
       *
       * @see handlerDefaults.getMainContentView()
       * @see viewController.setMainContentView();
       */
      ViewConstructor: null,

      /**
       * {this} is a reference to the view controller
       *
       * @param data {Object} the data object is passed in, so the view can be initialized with the data
       * @return view {View} a reference to a main content view for this route handler
       *
       * @see viewController.setMainContentView();
       */
      getMainContentView: function(data) {
        // Not ideal, but we must access handler through global scope, since `this` is the view controller
        if (App.router.currentHandler.view.ViewConstructor) {
          return new App.router.currentHandler.view.ViewConstructor({ options: data });
        }

        throw new Error('Handler must have either a view.ViewConstructor, or a view.getMainContentView()');
      }
    }
  };

  /**
   * The callback used by each route handler. The following steps are taken:
   *
   *   1) Give handlers a chance to manipulate the route by running any preExecute hooks
   *   2) Set up the data by extracting requiredParams and optionalParams from URL params, as well as any facet information
   *   3) Give handlers a chance to manipulate the data, or redirect, by running any preValidate hooks
   *   4) Validate the data
   *   5) Route to the corresponding main content view, or "notFound" if validation fails
   */
  var callback = function() {
    // Run any pre-execute hooks
    hook.call(this, 'preExecute');

    // Set up the data by extracting requiredParams and optionalParams from the current url params
    var data = _.pick(this.currentRoute.params, _.union(this.currentHandler.requiredParams || [], this.currentHandler.optionalParams || []));

    // Give handlers a chance to modify the data, and/or redirect
    var passthrough = hook.call(this, 'preValidate', [data]);

    if (passthrough) {
      // Validate the data & route
      var valid = validate(data, this.currentHandler.requiredParams);
      if (valid) {
        this.viewController.route(this.currentHandler, data);
      } else {
        this.viewController.route({ name: 'notFound' });
      }

      return true;
    }

    return false;
  };

  /**
   * Execute all hooks of a given type, that are specified for the current route handler.
   *
   * @param hookName {String} the name of the hook to execute, e.g. "preExecute" or "preValidate"
   * @param args {Array} an array of arguments to be applied to the hook, e.g [data]
   * @return false if any hook returns false, or is invalid, else true
   */
  var hook = function(hookName, args) {
    var hooks = this.currentHandler.hooks[hookName];
    var router = this;
    var result;

    if (!hooks) {
      return true;
    }

    if (!_.isArray(hooks)) {
      hooks = [hooks];
    }

    return _.every(hooks, function(hook) {
      if (_.isFunction(hook)) {
        result = hook.apply(router, args);
        return (result === false) ? (false) : true;
      } else if (_.isString(hook)) {
        if (_.isFunction(Hooks[hookName][hook])) {
          result = Hooks[hookName][hook].apply(router, args) !== false;
          return (result === false) ? (false) : true;
        }

        throw new Error('"' + hook + '"" hook not found.');
      }
      else {
        throw new Error('Invalid hook: "' + hook + '".');
      }

      return false;
    });
  };

  /**
   * Validate all required keys exist, and the data is of the right type
   *
   * @param data {Object} the full, final data object
   * @param requiredParams {Array} the handler's array of required keys
   * @return true if validation passes, else false
   */
  var validate = function(data, requiredParams) {
    // First, if there are required params, make sure they all exist
    if (!_.isEmpty(requiredParams)) {
      var hasRequiredParams = _.every(requiredParams, function(key) {
        return typeof data[key] !== 'undefined';
      });

      if (!hasRequiredParams) {
        // Not all of the required params exist. Fail validation
        return false;
      }
    }

    if (!_.isEmpty(data)) {
      // Ensure that keys with specified types have values that match the expected type
      if (!_.every(data, function(value, key) {
        switch (key) {
        case 'id':
          if (isNaN(value)) {
            return false;
          }
          value = parseInt(value);
        }

        return true;
      })) {
        // At least one key did not pass generic type matching
        return false;
      }
    }

    return true;
  };

  /**
   * Set up an individual handler by supplying defaults for necessary attributes that do not exist.
   * Additionally, validate that all required attributes exist.
   */
  var prepareHandler = function(handler) {
    var required = ['name', 'paths'];

    var missing = _.any(required, function(key) {
      return _.isEmpty(handler[key]);
    });

    if (!missing) {
      _.defaults(handler, handlerDefaults);

      handler.regexp = _(handler.paths).map(function(path) {
        return Backbone.Router.prototype._routeToRegExp(path);
      }).value();

      if (!_.isFunction(handler.view.getMenuId)) {
        handler.view.getMenuId = handlerDefaults.view.getMenuId;
      }

      if (!_.isFunction(handler.view.getMainContentView)) {
        handler.view.getMainContentView = handlerDefaults.view.getMainContentView;
      }
    }
    else {
      throw new Error('At least one route handler is missing at least one required attribute');
    }
  };

  /**
   * Used for sorting handlers. Route handler must exist for paths specified here.
   * Sorts handler names against _.uniq(_.values(order)).
   * keys exist only for full visiblility of routes in a single place.
   *
   * @see router/handlers
   * @see router/order
   */
  var routes = _.uniq(_.values(order));

  // Sort handlers based on order supplied via `order` variable
  handlers.sort(function(handler1, handler2) {
    var a = routes.indexOf(handler1.name);
    var b = routes.indexOf(handler2.name);

    if (a === -1) {
      throw new Error('Need to set up route order for ' + handler1.name);
    }

    if (b === -1) {
      throw new Error('Need to set up route order for ' + handler2.name);
    }

    return a - b;
  });

  // Call the prepareHandler() helper for each sorted handler
  _.each(handlers, function(handler) {
    prepareHandler(handler);
  });

  return handlers;
});
