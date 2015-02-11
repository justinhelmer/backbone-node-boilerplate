/**
 * @file config.js
 * Holds the global configuration options used by the local grunt instance
 */

(function () {
  'use strict';

  var clientPath = './client';
  var serverPath = './server';
  var appPath = clientPath + '/app';

  module.exports = {
    client: {
      rootPath      : appPath,
      imgPath       : appPath + '/images',
      cssPath       : appPath + '/css',
      scriptPath    : appPath + '/js',
      libraryPath   : './node_modules',
      templatesPath : appPath + '/templates'
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
