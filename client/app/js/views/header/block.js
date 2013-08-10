/**
 * @file header/block.js
 * Set up block view for header
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/block'
], function(BlockView) {
  'use strict';

  var HeaderBlockView = BlockView.extend({
    el: '#header',
    template: 'HeaderBlockView',

    initialize: function () {
      this.render();
    },

    render: function () {
      $(this.el).html(this.hbars());

      return this;
    }
  });

  return HeaderBlockView;
});