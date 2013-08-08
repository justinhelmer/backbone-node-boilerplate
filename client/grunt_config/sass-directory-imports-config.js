/**
 * @file sass-directory-imports-config.js
 * Holds the configuration options for the sass-directory-imports plugin
 *
 * @author Justin Helmer 8/5/2013
 */

module.exports = {
  files: {
    // All sass files that begin with "_' in cssPath will be imported into _all
    src: ['<%= cssPath %>/views/_all.scss']
  }
};