/**
 * @file config.js
 * Define global server-side configuration
 *
 * @author Justin Helmer 8/7/2013
 */

(function () {
  'use strict';

  module.exports = {
    apiRoot : '/',
    host : '127.0.0.1',
    port : 3000,
    corsOptions : {}, // access to all origins (not safe for production),
    contentNegotiation: { // assumes 1<->1 relationship
      'application/vnd.jhelmer.backbone-node-boilerplate+json': 'json'
    }
  };
}());