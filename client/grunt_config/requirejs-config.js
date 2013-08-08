/**
 * @file requirejs-config.js
 * Holds the configuration options for the grunt-contrib-requirejs plugin
 *
 * @author Justin Helmer 8/5/2013
 */

module.exports = {
  options: {
    appDir: '<%= applicationFolder %>',
    baseUrl: '<%= scriptFolder %>', // relative to appDir
    name: 'main',
    mainConfigFile: '<%= scriptPath %>/main.js',
    skipDirOptimize: true
  },
  dist: {
    options: {
      dir: '<%= buildPaths.dist %>',
      optimize: 'uglify2',
      optimizeCss: 'none'
    }
  }
};
