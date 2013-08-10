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
    version : 'v1',
    host : '127.0.0.1',
    port : 3000,
    corsOptions : {} // access to all origins (not safe for production)
  };
}());