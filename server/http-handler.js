/**
 * @file http-handler.js
 * Handle external http requests
 *
 * @author Justin Helmer 9/7/2013
 */

(function () {
  'use strict';

  var config = require('./config'),
      http   = require('http'),
      _      = require('underscore');

  var _options = null,
      _req     = null,
      _res     = null;

  var httpHandler = {
    request: function (req, res, options) {
      _req = req;
      _res = res;
      _options = _.extend({
        method: 'GET',
        path: req.url,
        params: req.params || {},
        body: req.body || {},
        mock: {}, // use mock data for development

        success: function (response) {
          res.send(response);
        },

        error: function (e) {
          console.log('Problem with request: ' + e.message);
          res.send(500, 'Bad request');
        }
      }, options);

      var httpOptions = _.extend(config.httpHandler.httpOptions, {
        method: _options.method,
        path: config.httpHandler.root + _options.path
      });

      // Check if we are using mock data or actually handling request
      if (config.httpHandler.mock) {
        res.send(_options.mock);
      }
      else {
        var httpReq = http.request(httpOptions, this.callback);
        httpReq.on('error', _options.error);

        if (!_.isEmpty(_options.body)) {
          httpReq.write(JSON.stringify(_options.body));
        }
        httpReq.end();
      }
    },

    callback: function (res) {
      if (res.statusCode === 200) {
        var jsonString = '';

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
          jsonString += chunk;
        });

        res.on('end', function () {
          _options.success(JSON.parse(jsonString));
        });
      }
      else {
        httpHandler.error(res.statusCode, 'The remote data source is throwing this error.');
      }
    },

    error: function (statusCode, message) {
      message = (message || 'Bad request');
      console.log('Problem with request: ' + message);
      _res.send(statusCode, message);
    }
  };

  module.exports = httpHandler;
}());