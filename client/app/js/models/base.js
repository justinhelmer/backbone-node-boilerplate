/**
 * @file base.js
 * Backbone model to be extended by all other models
 *
 * @author Justin Helmer 9/7/2013
 */

define([
  'backbone'
], function(Backbone) {
  'use strict';

  var BaseModel = Backbone.Model.extend({});

  return BaseModel;
});