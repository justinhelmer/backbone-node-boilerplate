define([
  'views/pages/error'
], function(ErrorView) {
  'use strict';

  var handler = {
    name: 'error',
    paths: ['*actions'],

    hooks: {
      preValidate: function(data) {
        if (!data.status || !data.message) {
          // Assume 404
          data.status = 'Page not found';
          data.message = 'This page does not exist';
        }
      }
    },

    view: {
      ViewConstructor: ErrorView
    }
  };

  return handler;
});
