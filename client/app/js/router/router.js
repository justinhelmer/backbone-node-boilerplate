/**
 * @file router.js
 *
 * 1) Register route callbacks for each route path defined in all route handlers
 * 2) Keep track of the current route (currentRoute), which holds information about the current URL and data extracted from the URL
 * 3) Keep track of the current handler (currentHandler), which holds information and functionality pertaining to a route or series of routes
 *
 * @see router/public for a list of public router functions, for external use
 * @see router/private for a list of private router functions, for use within the route only
 *         * Also contains definition for currentRoute
 * @see router/handlers
 *         * Also contains definition for currentHandler
 */

define([
  'backbone',
  'router/public',
  'router/private'
], function (Backbone, PublicAppRouter, PrivateAppRouter) {
  'use strict';

  var Router = Backbone.Router.extend({
    // @see router/public
    currentRoute: null,

    // @see router/handlers
    currentHandler: null,

    /**
     * Run when the router is initialized. Should only be initialized one time, and attached to the globa scope.
     *
     * @see main.js
     */
    initialize: function (viewController) {
      this.viewController = viewController;
      PrivateAppRouter.normalizeURL.call(this);
    },

    /**
     * Override Backbone.Router.navigate() with a custom method, to allow a URL to be built off of attributes.
     * Additionally, checks to ensure the route is supported by the app before attempting to execute a callback.
     *
     * @param {String} fragment the URL fragment to navigate to. If not supplied, tries to build a URL from options.attributes
     * @param {Object} options contains the following possible values:
     *                          {
     *                            // Flag to indicate whether to replace the current history information, or add a new item to history. Default: false
     *                            replace: {Boolean}
     *
     *                            // Flag to indicate whether to trigger the route handler's callback for the associated route. Default: false
     *                            trigger: {Boolean}
     *
     *                            // An object of key -> value pairs of attributes for building a URL dynamically.
     *                            // if `fragment` is null, the route handler's buildUrl() method is fired with these attributes, to generate `fragment`
     *                            attributes: {Object}
     *                          }
     */
    navigate: function(fragment, options) {
      options = options || {};

      if (fragment === null) {
        if (options.attributes) {
          fragment = this.buildUrl(options.attributes);
          delete options.attributes;
        }
      }

      if (fragment === null || fragment === false) {
        throw new Error('navigate() requires either a url fragment, or an object of attributes to exists at options.attributes');
      }

      var isValidFragment = this.isSupported(fragment);

      /**
       * If navigate is called with trigger:true, router.execute() is fired, which will updateCurrent.
       * However, without trigger:true, we need to ensure updateCurrent is called.
       *
       * Calling twice will not have a negative impact, since "fragment" is the same between here and execute().
       *
       * @see PrivateAppRouter.updateCurrent()
       */
      if (isValidFragment) {
        isValidFragment = PrivateAppRouter.updateCurrent.call(this, fragment, options);
      }

      if (isValidFragment) {
        Backbone.Router.prototype.navigate.call(this, fragment, options);
        return this;
      }

      return false;
    },

    /**
     * Override Backbone.Router.execute() with a custom method, validating that the current route should be supported by the app.
     *
     * @param {Function} callback a reference to the route handler's callback to invoke
     *
     * @see PrivateAppRouter.checkAppDeepLink()
     * @see PrivateAppRouter.checkNotSupported()
     */
    execute: function(callback) {
      PrivateAppRouter.updateCurrent.call(this);
      return Backbone.Router.prototype.execute.call(this, callback);
    },

    back: function() {
      window.history.back();
    },

    /**
     * Check if the URL is supported before calling Backbone's native execute() function.
     *
     * @see this.navigate()
     */
    isSupported: function() {
      return true;
    }
  });

  /**
   * For each route handler, set up a Backbone route for the paths provided, with the route handler's callback
   *
   * @see router/_handlers for route handler information
   */
  var routes = {};

  _.each(PrivateAppRouter.getHandlers(), function(handler) {
    _.each(handler.paths, function(path) {
      routes[path] = function() {
        handler.callback.apply(this, arguments);
      };
    });
  });

  // Include all Backbone routes that we just set up, as well as all public functions for external use
  _(Router.prototype).extend(PublicAppRouter).extend({ routes: routes });

  return Router;
});
