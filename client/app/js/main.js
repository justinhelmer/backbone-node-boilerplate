/**
 * @file main.js
 * Initialization script for application.
 */

require([
  'jquery',
  'underscore',
  'backbone',
  'router/router',
  'router/viewController',
  'events',
  'jquery.cookie'
], function ($, _, Backbone, Router, ViewController, GlobalEvents) {
  'use strict';

  // Globally namespaced objects, keep to absolute minimum
  window.App = {};

  // Initialize a global route handler
  window.App.router = new Router(new ViewController());

  // Set up all global events
  new GlobalEvents();

  // Trigger the initial route and enable HTML5 pushState support
  Backbone.history.start({
    pushState: true,
    urlRoot: '/'
  });
});
