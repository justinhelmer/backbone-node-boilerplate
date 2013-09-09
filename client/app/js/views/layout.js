/**
 * @file layout.js
 * Main application container
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/base',
  'views/header',
  'views/navigation',
  'views/footer'
], function(BaseView, HeaderView, NavigationView, FooterView) {
  'use strict';

  var LayoutView = BaseView.extend({
    el: '#container',

    postRender: function () {
      new HeaderView();
      new NavigationView();
      new FooterView();
    }
  });

  return LayoutView;
});
