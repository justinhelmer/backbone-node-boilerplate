(function () {
  'use strict';

  require('../support/main')();

  var app = require('../support/app');

  describe('requesting a deep path', function () {
    it('returns the index.html', function (done) {
      app
        .get('/monkeys/793')
        .set('Accept', 'text/html')
        .end(function (err, res) {
          expect(res.status).toEqual(200);
          expect(res.get('Content-Type')).toMatch(/text\/html;/);
          done();
        });
    });
  });
})();