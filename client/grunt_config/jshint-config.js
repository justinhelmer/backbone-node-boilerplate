/**
 * @file jshint-config.js
 * Holds the configuration options for the grunt-contrib-jshint plugin
 *
 * @author Justin Helmer 8/5/2013
 */

module.exports = {
  dev: {
    options: {
      camelcase: true,
      curly: true,
      eqeqeq: true,
      indent: 2,
      newcap: true,
      quotmark: 'single'
    },
    src: [
      'Gruntfile.js',
      'grunt_config/*',
      '<%= scriptPath %>/*.js',
      '!<%= scriptPath %>/templates.js',
      '<%= scriptPath %>/models/*.js',
      '<%= scriptPath %>/views/*.js',
      '<%= scriptPath %>/views/**/*.js',
      '<%= scriptPath %>/collections/*.js',
      '<%= scriptPath %>/utils/*.js'
    ]
  }
};