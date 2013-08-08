/**
 * @file base.js
 * Set up base view for other views to extend
 *
 * @author Justin Helmer 8/5/2013
 */

define([
  'backbone',
  'lodash',
  'jst'
], function(Backbone, _, JST) {
  var BaseView = Backbone.View.extend({
    hbars: function () {
      if (_.isString(arguments[0])) {
        // Function was called in the format of hbars(template, data, extra)
        data = arguments[1] || {};
        extra = arguments[2] || {};
        return JST[arguments[0]](data, extra);
      }
      else if (typeof this.template !== 'undefined') {
        // Function was called in the format of hbars(data, extra)
        data = arguments[0] || {};
        extra = arguments[1] || {};
        return JST[this.template](data, extra);
      }

      return '';
    }
  });

  return BaseView;
});