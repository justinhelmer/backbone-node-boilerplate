/**
 * @file router.js
 * Set up URL routes for the application, and load the appropriate view
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'backbone'
], function(Backbone) {
  // Set up a Router object that contains the route information
  var Router = Backbone.Router.extend({
    routes: {
      'foos'     : 'fooList',
      'foos/:id' : 'foo',

      // Default - catch all
      '*actions'     : 'dashboard'
    },
  });

  // Return an object with a simple constructor function that requires
  // the appropriate Backbone view when the associated route is triggered
  // @TODO can we regex the query params dynamically and generate this list
  // based on the list of routes?
  return {
    initialize: function (options) {
      var router = new Router(options);

      router.on('route:fooList', function () {
        require(['views/fooList/page'], function (FooListPageView) {
          new FooListPageView();
        });
      });

      router.on('route:foo', function (id) {
        require(['views/foo/page'], function (FooPageView) {
          new FooPageView({id: id});
        });
      });

      router.on('route:dashboard', function (actions) {
        require(['views/dashboard/page'], function (DashboardPageView) {
          new DashboardPageView();
        });
      });
    }
  };
});
