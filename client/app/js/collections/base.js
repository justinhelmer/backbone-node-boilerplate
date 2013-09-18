/**
 * @file base.js
 * Backbone collection for other collections to extend
 *
 * @author Justin Helmer 9/18/2013
 */

define([
  'backbone',
  'config',
  'views/base'
], function(Backbone, config, BaseView) {
  'use strict';

  var BaseCollection = Backbone.Collection.extend({
    timeout: 10000,

    // Each collection that extends BaseCollection must set the endpoint path
    endpoint: '',

    url: function () {
      return config.api.url + this.endpoint;
    },

    fetch: function () {
      Backbone.Collection.prototype.fetch.call(this, {
        timeout: this.timeout,
        error: this.error
      });
    },

    error: function (collection, resp, options) {
      BaseView.prototype.renderError(collection, resp, options);
    }
  });

  return BaseCollection;
});
