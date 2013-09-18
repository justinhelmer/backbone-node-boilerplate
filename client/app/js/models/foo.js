/**
 * @file foo.js
 * Backbone model representing an individual foo
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'models/base'
], function(BaseModel) {
  'use strict';

  var FooModel = BaseModel.extend({
    endpoint: 'foo',

    defaults: {
      name: '',
      description: ''
    }
  });

  return FooModel;
});
