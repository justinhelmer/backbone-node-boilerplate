(function () {
  'use strict';

  var cors = require('cors'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    app = express(),
    config = require('./config'),
    path = require('path');

  app.use(
    cors(),
    cookieParser(),
    bodyParser.json()
  );

  app.use('/js/libs', express.static(path.join(__dirname, '../node_modules')));
  app.use(express.static(path.join(__dirname, '../client/build/dev')));

  var router = express.Router();
  require('./routes/route.foos')(router);
  app.use(router);

  // Fallback, serve index.html
  app.use(
    function (req, res, next) {
      if (!req.url.match(/^\/api/)) {
        req.url = '/index.html';
      }

      next();
    },
    express.static(path.join(__dirname, '../client/build/dev'))
  );

  module.exports = app;
})();
