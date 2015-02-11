define([
  'views/pages/foo'
], function(FooView) {
  'use strict';

  var handler = {
    name: 'foo',
    paths: ['foos/:id'],

    requiredParams: ['id'],

    view: {
      ViewConstructor: FooView
    }
  };

  return handler;
});
