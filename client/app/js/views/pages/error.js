/**
 * @file error.js
 * Display the error page
 */

define([
  'views/page'
], function(PageView) {
  'use strict';

  var ErrorView = PageView.extend({
    template: 'error'
  });

  return ErrorView;
});
