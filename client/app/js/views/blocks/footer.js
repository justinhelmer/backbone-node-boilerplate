/**
 * @file footer.js
 * Set up view for footer
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/block'
], function(BlockView) {
  'use strict';

  var FooterView = BlockView.extend({
    el: '#footer'
  });

  return FooterView;
});