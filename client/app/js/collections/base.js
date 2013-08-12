/**
 * @file base.js
 * Set up base collection for other collections to extend
 *
 * @author Justin Helmer 8/11/2013
 */

define([
  'backbone'
], function(Backbone) {
  'use strict';

  var BaseCollection = Backbone.Collection.extend({});

  return BaseCollection;
});