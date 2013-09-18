/**
 * @file header.js
 * Set up view for header
 *
 * @author Justin Helmer 9/7/2013
 */

define([
  'views/block'
], function(BlockView) {
  'use strict';

  var HeaderView = BlockView.extend({
    el: '#header'
  });

  return HeaderView;
});
