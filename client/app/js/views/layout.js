/**
 * @file layout.js
 * Main application container
 */

define([
  'views/base',
  'views/blocks/header',
  'views/blocks/footer'
], function(BaseView, HeaderView, FooterView) {
  'use strict';

  var LayoutView = BaseView.extend({
    el: '#container',
    template: 'layout',

    postRender: function () {
      new HeaderView();
      new FooterView();
    }
  });

  return LayoutView;
});
