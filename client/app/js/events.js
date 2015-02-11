/**
 * @file events.js
 * Attach global events on DOM ready / window ready / etc.
 */

define([
  'backbone'
], function (Backbone) {
  'use strict';

  var GlobalEvents = function () {

    /**
     * All URLs with a relative href should be passed through the router.navigate()
     * method, to be processed by the router. If the link has a `data-bypass` attribute,
     * bypass the delegation completely.
     */
    Backbone.$(document).on('click', 'a[href]:not([href^=#]),a:not([data-bypass])', function (e) {
      // Get the absolute href
      var href = {
        prop: $(this).prop('href'),
        attr: $(this).attr('href')
      };

      // Get the absolute root.
      var root = location.protocol + '//' + location.host + '/';

      // Ensure the root is part of the anchor href, meaning it's relative.
      if (href.prop.slice(0, root.length) === root) {
        // Stop the default event to ensure the link will not cause a page refresh.
        e.preventDefault();

        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events. The Router's internal `navigate` method
        // calls this anyways.  The fragment is sliced from the root.
        App.router.navigate(href.attr, {trigger: true});
      }
    });
  };

  return GlobalEvents;
});
