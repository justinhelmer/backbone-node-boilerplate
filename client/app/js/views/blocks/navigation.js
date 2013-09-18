/**
 * @file navigation.js
 * Set up view for navigation
 *
 * @author Justin Helmer 9/7/2013
 */

define([
  'views/block'
], function(BlockView) {
  'use strict';

  var NavigationView = BlockView.extend({
    el: '#navigation'
  });

  return NavigationView;
});