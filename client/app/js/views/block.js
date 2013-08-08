/**
 * @file block.js
 * Set up a block view for other block views to extend
 *
 * @author Justin Helmer 8/4/2013
 */

define([
  'views/base'
], function(BaseView) {
  var BlockView = BaseView.extend({
    className: 'block'
  });

  return BlockView;
});