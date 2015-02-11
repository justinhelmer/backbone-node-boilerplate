/**
 * @file base.js
 * Backbone collection for other collections to extend
 */

define([
  'underscore',
  'backbone',
  'config'
], function(_, Backbone, config) {
  'use strict';

  var BaseCollection = Backbone.Collection.extend({
    initialize: function(models, data) {
      _.extend(this, data || {});
    },

    timeout: function() {
      return config.api.timeout;
    },

    // Each collection that extends BaseCollection must set the endpoint path
    endpoint: function() {
      throw new Error('Missing collection.endpoint');
    },

    url: function() {
      return config.api.url + _.result(this, 'endpoint') + this.prepareQuery();
    },

    prepareQuery: function() {
      var query = '';

      if (!_.isEmpty(this.params)) {
        query += '?' + $.param(this.params);
      }

      return query;
    },

    fetch: function() {
      Backbone.Collection.prototype.fetch.call(this, {
        timeout: this.timeout,
        success: this.success
      });
    },

    success: function(collection, resp, options) {
      // If the "current" property is passed, update it to reference the model
      if (collection.current && (_.isString(collection.current) || _.isNumber(collection.current))) {
        collection.setCurrent.call(collection, collection.current, false);
      }
    },

    setCurrent: function(current, trigger) {
      current = this.get(current);

      if (current) {
        this.current = current;

        if (trigger !== false) {
          this.trigger('change:current');
        }
      }
    }
  });

  return BaseCollection;
});
