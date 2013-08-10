/**
 * @file fooList/page.js
 * Set up page content view for foo list
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'backbone',
  'config',
  'views/page',
  'models/foo'
], function(Backbone, config, PageView, FooModel) {
  'use strict';

  var FooListPageView = PageView.extend({
    model: 'Foo',
    template: 'FooListPageView',

    initialize: function () {
      var _view = this;

      var fooCollection = new Backbone.Collection([], {
        model: FooModel,
        url: config.api.url + 'foos',
      });

      fooCollection.fetch({
        success: function (collection, response, options) {
          _view.render(response);
        }
      });
    },

    render: function (foos) {
      var fooBlockViewTemplate = 'FooBlockView';

      $(this.el).html(this.hbars({foos : foos}, {
        partials: {
          fooBlock: JST[fooBlockViewTemplate]
        }
      }));

      return this;
    }
  });

  return FooListPageView;
});