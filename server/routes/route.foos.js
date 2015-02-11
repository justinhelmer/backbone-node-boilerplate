(function () {
  'use strict';

  module.exports = function (router) {
    router.route('/api/foos/:id')
    .get([
      function (req, res) {
        res.status(200).send({
          id: req.params.id,
          name: 'this is foo ' + req.params.id,
          desc: 'i am foo ' + req.params.id + ' and this is my description'
        }).end();
      }
    ]);

    router.route('/api/foos')
    .get([
      function (req, res) {
        res.status(200).send([
          {
            id: 1,
            name: 'this is foo 1',
            desc: 'i am foo 1 and this is my description'
          }, {
            id: 2,
            name: 'this is foo 2',
            desc: 'i am foo 2 and this is my description'
          }, {
            id: 3,
            name: 'this is foo 3',
            desc: 'i am foo 3 and this is my description'
          }
        ]).end();
      }
    ]);
  };
})();
