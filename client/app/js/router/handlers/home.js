define([
  'views/pages/home'
], function(HomeView) {
  'use strict';

  var handler = {
    name: 'home',
    paths: ['', 'home'],

    view: {
      ViewConstructor: HomeView
    }
  };

  return handler;
});
