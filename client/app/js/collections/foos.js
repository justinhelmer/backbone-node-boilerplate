define([
  'collections/base',
  'models/foo'
], function (BaseCollection, FooModel) {
  'use strict';

  var FoosCollection = BaseCollection.extend({
    endpoint: 'foos',
    model: FooModel
  });

  return FoosCollection;
});