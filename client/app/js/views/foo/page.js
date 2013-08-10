/**
 * @file foo/page.js
 * Set up page view for foo details
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/page',
  'models/foo'
], function(PageView, FooModel) {
  'use strict';

  var FooPageView = PageView.extend({
    template: 'FooPageView',

    initialize: function (data) {
      var _view = this;
      var fooModel = new FooModel({id: data.id});

      fooModel.fetch({
        success: function (model, response, options) {
          _view.render(response);
        }
      });
    },

    render: function (foo) {
      $(this.el).html(this.hbars(foo));

      return this;
    }
  });

  return FooPageView;
});