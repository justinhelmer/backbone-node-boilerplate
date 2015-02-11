/**
 * @file home.js
 * Display the home page
 */

define([
  'views/page'
], function(PageView) {
  'use strict';

  var HomeView = PageView.extend({
    template: 'home'
  });

  return HomeView;
});
