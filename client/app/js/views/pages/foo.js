/**
 * @file foo.js
 * Set up view for foo details
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'models/foo',
  'views/page',
], function(FooModel, PageView) {
  'use strict';

  var FooView = PageView.extend({
    init: function () {
      this.model = new FooModel({id: this.options[0]});
      return this;
    }
  });

  return FooView;
});