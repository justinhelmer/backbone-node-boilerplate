/**
 * @file error.js
 * Display an error message. Can be inherited by specific error codes
 *
 * @author Justin Helmer 9/8/2013
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
