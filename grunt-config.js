/**
 * @file config.js
 * Holds the global configuration options used by the local grunt instance
 *
 * @author Justin Helmer 8/10/2013
 */

(function () {
  'use strict';

  var clientPath = './client';
  var serverPath = './server';
  var appPath = clientPath + '/app';

  module.exports = {
    client: {
      rootPath      : appPath,
      cssPath       : appPath + '/css',
      scriptPath    : appPath + '/js',
      libraryPath   : appPath + '/js/libs',
      templatePaths :[appPath + '/templates/*.html',
                      appPath + '/templates/**/*.html']
    },
    server: {
      rootPath      : serverPath
    },
    buildPaths: {
      dev           : clientPath + '/build/dev',
      dist          : clientPath + '/build/dist'
    },
    configPath      : './grunt_config',
    tasksPath       : './grunt_tasks'
  };
}());