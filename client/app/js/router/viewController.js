/**
 * @file viewController.js
 *
 * The main role of the viewController is to accept a flat data object (from the router) and initialize the appropriate sub-view.
 * This “sub-view” that is initialized extends MainContentView, and each MainContentView represents a unique section of content
 * (or route) for the web app.
 *
 * In addition, the viewController initializes views that are common across all sections, e.g. header view.
 */

define([
  'views/layout'
], function (LayoutView) {
  /*jshint nonew:false*/
  'use strict';

  var ViewController = function () {
    this.initialize();
  };

  _.extend(ViewController.prototype, {

    /**
     * Set up any global views (i.e. header view).
     *
     * @see main.js, which calls ViewController.initialize() directly
     */
    initialize: function () {
      new LayoutView();
    },

    /**
     * Determine which View to initialize based on the route
     *
     * @param {String} / {Object} handler The name of the handler, or handler object itself
     * @param {Object} data the normalized data extracted from URL query params and/or segments
     */
    route: function (handler, data) {
      if (_.isString(handler)) {
        handler = {name: handler};
      }

      this.currentMainContentView = this.getMainContentView(handler, data);
    },

    /**
     * Initialize a content view for the appropriate handler with the corresponding data.
     *
     * @param {String} / {Object} handler The name of the handler, or handler object itself
     * @param {Object} data the normalized data extracted from URL query params and/or segments
     */
    getMainContentView: function (handler, data) {
      var loaded = true;
      if (_.isString(handler)) {
        handler = {name: handler};
        loaded = false;
      }

      if (this.currentMainContentView) {
        this.currentMainContentView.undelegateEvents();
        if (_.isFunction(this.currentMainContentView.close)) {
          this.currentMainContentView.close();
        }
      }

      if (!loaded) {
        handler = App.router.getHandlerByName(handler);
      }

      if (handler.view) {
        return handler.view.getMainContentView.call(this, data);
      }
      else {
        throw new Error('Unknown route: ' + handler.name);
      }
    }
  });

  return ViewController;
});
