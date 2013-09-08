/**
 * @file main.js
 * Initialization script for application.
 * Set up requirejs config and initialize the router
 *
 * @author Justin Helmer 8/4/2013
 */

require.config({
  paths: {
    jquery     : '../js/libs/jquery/jquery',
    lodash     : '../js/libs/lodash/lodash',
    backbone   : '../js/libs/backbone/backbone',
    text       : '../js/libs/requirejs-text/text',
    handlebars : '../js/libs/handlebars/handlebars',
    jst        : 'templates'
  },
  shim: {
    backbone: {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    jst: {
      deps: ['handlebars']
    }
  }
});

require([
  'backbone',
  'jquery',
  'lodash',
  'router',
  'config',
  'views'
], function (Backbone, $, _, Router, config, Views) {
  'use strict';

  // Initialize a global route handler
  new Router();

  // Prepare default AJAX request options
  $.ajaxSetup({
    headers: {
      'Accept': config.api.vendorJSON + '; version=' + config.api.version
    }
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on('click', 'a[href]:not([data-bypass])', function(e) {
    // Get the absolute href
    var href = {
      prop: $(this).prop('href'),
      attr: $(this).attr('href')
    };

    // Get the absolute root.
    var root = location.protocol + '//' + location.host + '/';

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      e.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, true);
    }
  });

  // Initialize and render the application container
  new Views.layout();

  // Trigger the initial route and enable HTML5 pushState support
  Backbone.history.start({
    pushState: true,
    urlRoot: '/'
  });
});
