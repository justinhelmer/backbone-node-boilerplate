/**
 * @file dashboard/page.js
 * Set up page content view for dashboard home page
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/page'
], function(PageView) {
  'use strict';

  var DashboardPageView = PageView.extend({
    template: 'DashboardPageView',

    initialize: function () {
      this.render();
    },

    render: function () {
      $(this.el).html(this.hbars());
    }
  });

  return DashboardPageView;
});
