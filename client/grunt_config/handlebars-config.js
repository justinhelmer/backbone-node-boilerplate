/**
 * @file handlebars-config.js
 * Holds the configuration options for the grunt-contrib-handlebars plugin
 *
 * @author Justin Helmer 8/5/2013
 */

var StringFunctions = require('../app/js/utils/stringFunctions');

module.exports = {
  options: {
    amd: true,

    // Convert filepath to the name of the view it represents
    processName: function(filepath) {
      if (filepath.indexOf('layout.html') !== -1) {
        return 'LayoutView';
      }

      // Extract the name from the last two parts of the path
      var parts = filepath.split('/');
      var type = parts.pop().replace('.html', ''); // "block" or "page"
      var name = parts.pop();

      // Capitalize the first letter of the type and name
      name = StringFunctions.ucfirst(name);
      type = StringFunctions.ucfirst(type);

      // reconstruct the name of the view from the parts
      var viewName = name + type + 'View';

      return viewName;
    }
  },
  dist: {
    src: '<%= templatePaths %>',
    dest: '<%= scriptPath %>/templates.js'
  }
};
