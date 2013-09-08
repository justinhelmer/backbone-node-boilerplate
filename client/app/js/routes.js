/**
 * @file routes.js
 * Maintain a list of routes in the system, and determine view name based on naming conventions
 *
 * @author Justin Helmer 9/7/2013
 */

var views = [
  'views/fooList',
  'views/foo',
  'views/home'
];

define(['lodash'].concat(views), function (_) {
  'use strict';

  // The names of the view constructors can be inferred from the filenames
  var constructorNames = _.map(views, function (viewPath) {
    return viewPath.replace('views/', '');
  });

  // The constructors are passed in to the define[] context, after lodash
  var constructors = _.toArray(arguments).slice(1);

  // create an object of {constructorName => constructor} for router views.
  var routerViewConstructors = _.object(constructorNames, constructors);

  return {
    list: {
      'foo'      : 'fooList',
      'foo/:id'  : 'foo',
      ''         : 'home'
    },

    routerViewConstructors: routerViewConstructors
  };
});