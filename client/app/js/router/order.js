/**
 * @file order.js
 *
 * Specify the order of routes
 *
 * @see router/handlers
 */

define([], function () {
  'use strict';

  var order = {
    '': 'home',
    'foos/:id': 'foo',
    'foos': 'foos',
    '*actions': 'error'
  };

  return order;
});
