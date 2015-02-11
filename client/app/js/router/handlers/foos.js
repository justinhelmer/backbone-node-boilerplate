define([
  'views/pages/foos'
], function(FoosView) {
  'use strict';

  var handler = {
    name: 'foos',
    paths: ['foos'],

    view: {
      ViewConstructor: FoosView
    }
  };

  return handler;
});
