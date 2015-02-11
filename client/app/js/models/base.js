define([
  'underscore',
  'backbone',
  'config'
], function(_, Backbone, config) {
  'use strict';

  var BaseModel = Backbone.Model.extend({
    timeout: function() {
      return config.api.timeout;
    },

    // Each collection that extends BaseCollection must set the endpoint path
    endpoint: function() {
      throw new Error('Missing model.endpoint');
    },

    urlRoot: function() {
      return config.api.url + _.result(this, 'endpoint');
    },

    fetch: function(options) {
      Backbone.Model.prototype.fetch.call(this, _.defaults(options, {
        timeout: _.result(this, 'timeout')
      }));
    }
  });

  return BaseModel;
});
