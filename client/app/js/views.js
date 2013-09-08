/**
 * @file views.js
 * Attach all view controllers to Backbone, because this app relies
 * Heavily on naming conventions for clean abstraction.
 *
 * this is done so that constructors can be called by name, as to not use eval().
 */

// @TODO generate this list dynamically from the ./views folder during build
var list = [
  'views/base',
  'views/block',
  'views/foo',
  'views/fooList',
  'views/footer',
  'views/header',
  'views/home',
  'views/layout',
  'views/navigation',
  'views/page'
];

define(['backbone'].concat(list), function (Backbone) {
  'use strict';

  // The names of the view constructors can be inferred from the filenames
  var constructorNames = _.map(list, function (viewPath) {
    return viewPath.replace('views/', '');
  });

  // The constructors are passed in to the define[] context, after Backbone
  var constructors = _.toArray(arguments).slice(1);

  // return an object of {constructorName => constructor} for all views.
  return _.object(constructorNames, constructors);
});