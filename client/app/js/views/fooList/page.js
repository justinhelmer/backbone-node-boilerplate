/**
 * @file fooList/page.js
 * Set up page content view for foo list
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'collections/fooList',
  'views/page'
], function(FooListCollection, PageView) {
  'use strict';

  var FooListPageView = PageView.extend({
    template: 'FooListPageView',

    initialize: function () {
      var _view = this;

      var fooListCollection = new FooListCollection();

      fooListCollection.fetch({
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