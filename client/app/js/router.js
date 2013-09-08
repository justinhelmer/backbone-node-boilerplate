/**
 * @file router.js
 * Set up URL routes for the application, and load the appropriate view
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'backbone',
  'routes'
], function (Backbone, routes) {
  'use strict';

  var Router = Backbone.Router.extend({
    routes: _.clone(routes.list),

    initialize: function () {
      var _router = this;

      _.each(this.routes, function (routeName, route) {
        _router.on('route:' + routeName, function () {
          new routes.routerViewConstructors[routeName](arguments);
        });
      });
    }
  });

  return Router;
});
