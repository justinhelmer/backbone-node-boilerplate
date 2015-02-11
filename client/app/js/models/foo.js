define([
  'models/base'
], function (BaseModel) {
  'use strict';

  var FooModel = BaseModel.extend({
    endpoint: 'foos'
  });

  return FooModel;
});