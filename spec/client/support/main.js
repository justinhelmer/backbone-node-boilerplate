(function() {
  'use strict';

  var allTestFiles = [];
  var TEST_REGEXP = /(spec|test)\.js$/i;

  var pathToModule = function (path) {
    return path;
  };

  Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
      // Normalize paths to RequireJS module names.
      allTestFiles.push(pathToModule(file));
    }
  });

  require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/client/build/dev/js',

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start,

    paths: {
      "jquery": "../../../../node_modules/jquery/dist/jquery",
      "URIjs": "../../../../node_modules/URIjs/src",
      "lodash": "../../../../node_modules/lodash/lodash",
      "backbone": "../../../../node_modules/backbone/backbone",
      "handlebars": "../../../../node_modules/handlebars/dist/handlebars",
      "foundation": "../../../../node_modules/zurb-foundation-5/js/foundation/foundation",
      "nock": "../../../../node_modules/nock/index",
      "jasmine-ajax": "../../../../node_modules/jasmine-ajax/lib/mock-ajax",
      "jquery.cookie": "../../../../node_modules/jquery.cookie/jquery.cookie",
    },
    "map": {
      "*": {
        "underscore": "lodash"
      }
    },
    "shim": {
      "backbone": {
        "deps": [
          "underscore",
          "jquery"
        ],
        "exports": "Backbone"
      }
    }
  });
})();