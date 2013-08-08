/**
 * @file page.js
 * Set up page view for other views to extend
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/base'
], function(BaseView) {
  var PageView = BaseView.extend({
    el: '#main'
  });

  return PageView;
});