(function () {
  'use strict';

  module.exports = function (args) {
    return {
      options: {
        loadPath: [
          '<%=client.cssPath %>',
          '<%=client.libraryPath %>/zurb-foundation-5/scss'
        ],
        quiet: true
      },
      dev: {
        expand: true,
        cwd: '<%=client.cssPath %>',
        src: [
          '*.scss',
          '**/*.scss'
        ],
        dest: '<%= buildPaths.dev %>/css',
        ext: '.css'
      }
    };
  };
}());
