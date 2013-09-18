/**
 * @file base.js
 * Backbone model to be extended by all other models
 *
 * @author Justin Helmer 9/7/2013
 */

define([
  'backbone',
  'config',
  'views/base'
], function(Backbone, config, BaseView) {
  'use strict';

  var BaseModel = Backbone.Model.extend({
    timeout: 10000,

    // Each collection that extends BaseCollection must set the endpoint path
    endpoint: '',

    urlRoot: function () {
      return config.api.url + this.endpoint;
    },

    fetch: function (options) {
      Backbone.Model.prototype.fetch.call(this, {
        timeout: this.timeout,
        error: this.error
      });
    },

    save: function (key, val, options) {
      Backbone.Model.prototype.save.call(this, {}, {
        timeout: this.timeout,
        error: this.error
      });
    },

    error: function (model, resp, options) {
      BaseView.prototype.renderError(model, resp, options);
    }
  });

  return BaseModel;
});
