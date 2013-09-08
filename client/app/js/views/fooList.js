/**
 * @file fooList.js
 * Set up view for channel list
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'collections/fooList',
  'views/page',
], function(FooListCollection, PageView) {
  'use strict';

  var FooListView = PageView.extend({
    template: 'fooList',

    init: function () {
      this.collection = new FooListCollection();
      return this;
    }
  });

  return FooListView;
});