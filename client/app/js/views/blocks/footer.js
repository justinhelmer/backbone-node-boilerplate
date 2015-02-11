/**
 * @file footer.js
 * Set up view for footer
 */

define([
  'views/block'
], function(BlockView) {
  'use strict';

  var FooterView = BlockView.extend({
    el: '#footer',
    template: 'footer'
  });

  return FooterView;
});
