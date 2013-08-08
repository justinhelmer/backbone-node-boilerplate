/**
 * @file copy-config.js
 * Holds the configuration options for the grunt-contrib-copy plugin
 *
 * @author Justin Helmer 8/5/2013
 */

module.exports = {
  dev: {
    files: [
      {
        // copy all scripts
        src:  ['**'],
        dest: '<%= buildPaths.dev %>/js',
        expand: true,
        cwd: '<%= scriptPath %>'
      },
      {
        // copy index.html
        src:  ['*.html'],
        dest: '<%= buildPaths.dev %>',
        expand: true,
        cwd: '<%= applicationFolder %>'
      },
      {
        // copy images
        src:  ['imgs/*'],
        dest: '<%= buildPaths.dev %>/imgs',
        expand: true,
        cwd: '<%= applicationFolder %>'
      },
    ],
  }
};
