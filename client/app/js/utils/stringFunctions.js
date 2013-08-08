/**
 * @file stringFunctions.js
 * Provide a set of helpful functions for manipulating and referencing strings
 *
 * @author Justin Helmer 8/5/2013
 */

module.exports = {
  /**
   * Capitalize the first letter of a string
   */
  ucfirst: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
