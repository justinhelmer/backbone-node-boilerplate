/**
 * @file page.js
 * Set up page view for other views to extend
 */

define([
  'views/base'
], function(BaseView) {
  'use strict';

  var PageView = BaseView.extend({
    el: '#main'
  });

  return PageView;
});
