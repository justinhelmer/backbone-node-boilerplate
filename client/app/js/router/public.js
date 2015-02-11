/**
 * @file public.js
 *
 * Includes public functions and variables used by the router, and the entire app.
 * Since the router instance is attached to the global window object,
 * everything in this file will be made available globally.
 */

define([
  'URIjs/URI',
  'router/private'
], function(URI, PrivateAppRouter) {
  'use strict';

  return {
    getRouteHistory: function(index) {
      return PrivateAppRouter.getRouteHistory(index);
    },

    // Determine if a page is a deeplink, by checking history of routes against current page
    isDeepLink: function() {
      if (this.getRouteHistory().length === 1){
        var currentURI = this.getRouteHistory(1).uri.toString();
        var previousURI = this.currentRoute.uri.toString();

        return URI(previousURI).equals(currentURI);
      }
      return false;
    },

    buildUrl: function(attributes) {
      if (_.isFunction(this.currentHandler.buildUrl)) {
        return this.currentHandler.buildUrl.call(this, attributes);
      }

      throw new Error('Current handler doesn\'t have a buildUrl() method for the current route.');
    },

    /**
     * Return an individual handler, based on name.
     *
     * @param name {String} the name of the handler to return
     *
     * @return the handler object, or undefined
     */
    getHandlerByName: function(name) {
      return PrivateAppRouter.getHandlerByName(name);
    }
  };
});
