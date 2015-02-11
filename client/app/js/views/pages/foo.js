/**
 * @file foo.js
 * Display the foo page
 */

define([
  'views/page',
  'models/foo'
], function(PageView, FooModel) {
  'use strict';

  var FooView = PageView.extend({
    template: 'foo',

    init: function () {
      this.model = new FooModel({ id: this.options.id });
      return this;
    }
  });

  return FooView;
});
