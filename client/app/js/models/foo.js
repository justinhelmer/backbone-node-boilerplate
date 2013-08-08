/**
 * @file foo.js
 * Backbone model representing an individual foo
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'backbone',
  'config'
], function(Backbone, config) {
  var FooModel = Backbone.Model.extend({
    urlRoot: config.api.url + 'foos',

    defaults: {
      name: '',
      description: ''
    }
  });

  return FooModel;
});