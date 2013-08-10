/**
 * @file footer/block.js
 * Set up block view for footer
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/block'
], function(BlockView) {
  'use strict';

  var FooterBlockView = BlockView.extend({
    el: '#footer',
    template: 'FooterBlockView',

    initialize: function (data) {
      this.render();
    },

    render: function () {
      $(this.el).html(this.hbars());

      return this;
    }
  });

  return FooterBlockView;
});