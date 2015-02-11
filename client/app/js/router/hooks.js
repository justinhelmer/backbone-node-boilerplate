/**
 * @file hooks.js
 *
 * General route handler callback hooks for use across multiple route handlers.
 * Allows route handlers to hook into various steps of route handler callback execution.
 *
 * @see router/handlers
 */

define([
], function() {
  'use strict';

  var hooks = {
    /**
     * Called at the very begining of the route callback, before any data setup.
     *
     * A good use-case for preExecute is to manipulate the current route early, before data is set up.
     *
     * {this} is a reference to the router
     */
    preExecute: {
    },

    /**
     * Called after data is set up, right before it is validated. Gives the route
     * handler a chance to manipulate the data before validation/routing.
     *
     * A good use-case for preValidate is to append information to the data object.
     *
     * @params data {Object} a reference to the current data object. Can be changed by each preValidate hook and defaults
     *                       to the combination of the requiredKeys' data and optionalKeys' data, as well as facet data
     *
     * {this} is a reference to the router
     */
    preValidate: {
    }
  };

  return hooks;
});
