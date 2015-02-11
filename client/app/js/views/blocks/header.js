define([
  'views/block'
], function(BlockView) {
  'use strict';

  var HeaderView = BlockView.extend({
    el: '#header',
    template: 'header'
  });

  return HeaderView;
});
