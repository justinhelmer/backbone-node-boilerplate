/**
 * @file layout.js
 * Main application container
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/base',
  'views/header/block',
  'views/footer/block'
], function(BaseView, HeaderBlockView, FooterBlockView) {
  var LayoutView = BaseView.extend({
    el: '#container',
    template: 'LayoutView',

    initialize: function () {
      this.render();
      new HeaderBlockView();
      new FooterBlockView();
    },

    render: function () {
      $(this.el).html(this.hbars());

      return this;
    }
  });

  return LayoutView;
});
