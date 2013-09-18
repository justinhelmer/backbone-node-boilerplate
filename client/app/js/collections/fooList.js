/**
 * @file fooList.js
 * Backbone collection to maintain a list of foos
 *
 * @author Justin Helmer 9/7/2013
 */

define([
  'collections/base',
  'models/foo'
], function(BaseCollection, FooModel) {
  'use strict';

  var FooListCollection = BaseCollection.extend({
    endpoint: 'foo',
    model: FooModel
  });

  return FooListCollection;
});
