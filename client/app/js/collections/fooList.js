/**
 * @file fooList.js
 * Set up FooList collection
 *
 * @author Justin Helmer 8/11/2013
 */

define([
  'config',
  'collections/base',
  'models/foo'
], function(config, BaseCollection, FooModel) {
  'use strict';

  var FooListCollection = BaseCollection.extend({
    model: FooModel,
    url: config.api.url + 'foos'
  });

  return FooListCollection;
});