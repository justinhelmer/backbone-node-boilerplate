/**
 * @file foos.js
 * Display the foos page
 */

define([
  'views/page',
  'collections/foos'
], function(PageView, FoosCollection) {
  'use strict';

  var FoosView = PageView.extend({
    template: 'foos',

    init: function () {
      this.collection = new FoosCollection();
      return this;
    }
  });

  return FoosView;
});
