/**
 * @file private.js
 *
 * Mainly, provides an interface to the current route, and history of visited routes.
 *
 * However, includes all private functions and variables that the router interfaces with.
 * Not attached directly to the router; only made available to the scope of router.js.
 * This prevents unneeded functionality from being attached to the global scope.
 *
 * @see `routeDefaults` below, for a definition of an individual route, i.e. the externally acessible router.currentRoute
 */

define([
  'URIjs/URI',
  'backbone',
  'router/handlers'
], function(URI, Backbone, handlers) {
  'use strict';

  // Maintains an array of every route visited during the session
  var routeHistory = [];

  // Maintain a reference to the current fragment, so updateCurrent doesn't execute when there is no change
  var currentFragment;

  /**
   * Holds the definition for an individual route, i.e. the externally accessible router.currentRoute
   */
  var routeDefaults = {
    // The router path string for the route, e.g. 'shop/:categoryString(/:facetKeys)(/:facetValues)'
    path: null,

    // The regular expression for fragment matching against this route
    regexp: null,

    /**
     * A reference to a jQuery purl() object for the route, for easy extraction of route data.
     *
     * @see https://github.com/allmarkedup/purl
     */
    uri: null,

    /**
     * Normalized data object of Backbone route parameters and URL query parameters, for easy access whenver they are needed.
     *
     * @see getParams()
     */
    params: null
  };

  var Private = {
    /**
     * Return the sorted array of all route handlers
     *
     * @see router/_handlers
     */
    getHandlers: function() {
      return handlers;
    },

    /**
     * Return an individual handler, based on name.
     *
     * @param name {String} the name of the handler to return
     *
     * @return the handler object, or undefined
     */
    getHandlerByName: function(name) {
      return _.find(handlers, { name: name });
    },

    /**
     * Return information about a route, or set of routes, other than the current route.
     * For information about the current route, @see router.currentRoute
     *
     * @param index {Integer} if supplied, returns a route at a specific index
     *        If index < 0, pulls from the end of the history queue.
     *        *NOTE: index starts at 1, not 0. e.g.:
     *                getRouteHistory(-1) // returns information about the previous route
     *                getRouteHistory(1) // returns information about the first route visited
     *                getRouteHistory(0) // returns false
     *
     * @return:
     *    - if index is not supplied, returns an array of the entire history of routes since initial visit
     *    - if index is supplied, and route exists for supplied index, returns info about the route
     *    - if index is supplied, and route does not exist for supplied index, returns false
     */
    getRouteHistory: function(index) {
      // Prevent external callers from manipulating history directly
      var history = _.clone(routeHistory);

      if (index) {
        index = parseInt(index);

        if (index < 0) {
          return history[history.length + index - 1];
        }
        else if (index > 0) {
          return history[index - 1];
        }

        return false;
      }

      return history;
    },

    /**
     * Update the references to the currentRoute and currentHandler. Should be called whenever the user navigates
     *
     * @param {String} fragment the URL fragment being navigated to. Will pull from URL otherwise
     * @param options {Object} Router.navigate() options, excluding options.attributes. @see router.js
     *
     * @see `routeDefaults` in this file, to see the definition of `currentRoute`.
     * @see `handlerDefaults` in router/handlers/handlers, to see the definition of `currentHandler`
     */
    updateCurrent: function(fragment, options) {
      var router = this;

      if (normalizeURL.call(this, fragment)) {
        options = options || {};
        fragment = Backbone.history.getFragment(fragment);

        //@TODO: Issue with fragment matching, current fragment may or may not be decoded. Check why this is so...
        try {
          currentFragment = decodeURI(currentFragment);
        } catch(e) {}

        if (fragment !== currentFragment) {
          return _.any(handlers, function(handler) {
            return _.any(handler.regexp, function(regexp, index) {
              if (regexp.test(fragment)) {
                currentFragment = fragment;

                // Clone so internal handler cannot be altered directly
                router.currentHandler = _.clone(handler);

                if (options.replace) {
                  var removedRoute = routeHistory.pop();
                  router.trigger('routeHistory:remove', removedRoute);
                }

                var route = {
                  path: handler.paths[index],
                  regexp: handler.regexp[index]
                };

                // Attach a reference to a jQuery purl() object for the route
                route.uri = new URI(window.location.origin + '/' + fragment);

                // Get the Backbone route params and URL paramaters for easy reuse throughout the app
                route.params = getParams(route, fragment);

                var addedRoute = _.defaults(route, routeDefaults);
                routeHistory.push(addedRoute);

                router.trigger('routeHistory:add', addedRoute);

                // Clone so internal route cannot be altered directly
                router.currentRoute = _.clone(_.last(routeHistory));
                return true;
              }
            });
          });
        }

        return true;
      }
    },

    normalizeURL: function(fragment) {
      return normalizeURL.call(this, fragment);
    }
  };

  /**
   * Normalize the URL before parsing occurs.
   *
   * For example, jquery purl() fails on "@", and purl() is used for url parsing.
   * So "@" must be replaced with its html entity.
   *
   * @param {String} fragment the URL fragment being navigated to. Will pull from URL otherwise
   *
   * @return true if no changes were needed to normalize, else false
   */
  var normalizeURL =  function(fragment) {
    var routeStripper = /^[#\/]|\s+$/g;

    if (!fragment) {
      try {
        // might fail in instance of normalizeURL() being called in router initialize(), before Backbone.History is started
        fragment = Backbone.history.getFragment(fragment);
      } catch(e) {
        fragment = decodeURI(window.location.pathname + window.location.search).slice(1);
      }
    }

    // replace special characters
    var specialCharacters = {
      '@': '%40' // jQuery's purl() breaks on "@" - @see https://github.com/allmarkedup/purl/issues/44
    };

    var normalizedPath = fragment
      .replace(_.keys(specialCharacters), _.values(specialCharacters)) // replace special characters
      .replace(/\/$/, ''); // strip trailing slash

    if (fragment !== normalizedPath) {
      this.navigate(normalizedPath, { trigger: false, replace: true });
      return false;
    }

    return true;
  };

  /**
   * Returns an object of normalized backbone route parameters and url query parameters.
   * If there is a backbone route parameter and URL query parameter of the same name,
   * the backbone route parameter's value will be used.
   *
   * @param route {Object}    the current route object. Not accessible through router.currentRoute,
   *                          since currentRoute has not been set yet (called by updateCurrent())
   * @param fragment {String} the current URL fragment for extracting backbone route parameters
   * @return params {Oject} a key->value set of all parsed parameters (router and query), keyed by the path variable
   */
  var getParams = function(route, fragment) {
    return _.extend(getQueryParams(route), getRouteParams(route, fragment));
  };

  /**
   * Return an object of normalized URL query params.
   *
   * @param route {Object} the current route object. Not accessible through router.currentRoute,
   *                       since currentRoute has not been set yet (called by updateCurrent())
   * @return {Object} Normalized object after lowercasing all the keys
   */
  var getQueryParams = function(route) {
    var params = _.clone(route.uri.query(true));

    _.each(params, function(value, key) {
      if (key !== key.toLowerCase()) {
        params[key.toLowerCase()] = value;
        delete params[key];
      }
    });

    return params;
  };

  /**
   * Normalized data object of backbone route parameters defined in the route path.
   *
   * Keyed by the variable name specified in the path.
   *    e.g.: the route path:
   *
   *            'entity/:id'
   *
   *          with the following URL:
   *
   *            'entity/123?foo=bar'
   *
   *          yields:
   *
   *          {
   *            id: 123,
   *            foo: 'bar'
   *          }
   *
   * @param route {Object}    the current route object. Not accessible through router.currentRoute,
   *                          since currentRoute has not been set yet (called by updateCurrent())
   * @param fragment {String} the current URL fragment for extracting backbone route parameters
   * @return params {Oject} a key->value set of all parsed route parameters, keyed by the path variable
   */
  var getRouteParams = function(route, fragment) {
    var params = {};
    var args = Backbone.Router.prototype._extractParameters(route.regexp, fragment);

    if (!_.isEmpty(args)) {
      // Get the names of the keys
      var keys = _.map(route.path.match(/(:|\*)\w+/g), function(key) {
        return key.replace(/(:|\*)/, '');
      });

      params = _.object(keys, _.clone(args));

      _.each(params, function(value, key) {
        if (_.isEmpty(value)) {
          delete params[key];
        }
      });
    }

    return params;
  };

  return Private;
});
