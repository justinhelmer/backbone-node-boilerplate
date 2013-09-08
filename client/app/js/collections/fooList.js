/**
 * @file fooList.js
 * Backbone collection to maintain a list of foos
 *
 * @author Justin Helmer 9/7/2013
 */

define([
  'backbone',
  'config',
  'models/foo',
], function(Backbone, config, FooModel) {
  'use strict';

  var FooListCollection = Backbone.Collection.extend({
    url: config.api.url + 'foo',
    model: FooModel
  });

  return FooListCollection;
});