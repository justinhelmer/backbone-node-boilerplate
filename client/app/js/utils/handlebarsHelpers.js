define([
  'handlebars'
], function (Handlebars) {
  'use strict';

  Handlebars.registerHelper('encodeURIComponent', function (component) {
    return encodeURIComponent(component);
  });
});