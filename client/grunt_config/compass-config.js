/**
 * @file compass-config.js
 * Holds the configuration options for the grunt-contrib-compass plugin
 *
 * @author Justin Helmer 8/5/2013
 */

module.exports = {
  options: {
    sassDir: '<%= cssPath %>',
  },
  dev: {
    options: {
      cssDir: '<%= buildPaths.dev %>/<%= cssFolder %>',
      environment: 'development'
    }
  },
  dist: {
    options: {
      cssDir: '<%= buildPaths.dist %>/<%= cssFolder %>',
      environment: 'production'
    }
  }
};