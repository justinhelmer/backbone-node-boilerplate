/**
 * @file server.js
 * Main node server for web client.
 *
 * @see node.js docs http://nodejs.org/api/
 * @see express.js docs http://expressjs.com/api.html
 */

(function () {
  'use strict';

  var config = require('./config'),
      app    = require('./app');

  var server = app.listen(config.port, config.host, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Node server running at http://%s:%s', host, port);
  });
}());
