/**
 * @file foo.js
 * Backbone model representing an individual foo
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'models/base',
  'config'
], function(BaseModel, config) {
  'use strict';

  var FooModel = BaseModel.extend({
    urlRoot: config.api.url + 'foo',

    defaults: {
      name: '',
      description: ''
    }
  });

  return FooModel;
});