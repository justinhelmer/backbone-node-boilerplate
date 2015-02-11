/**
 * @file block.js
 * Set up a block view for other block views to extend
 */

define([
  'views/base'
], function(BaseView) {
  'use strict';

  var BlockView = BaseView.extend({
    className: 'block'
  });

  return BlockView;
});
