(function() {
    var supertest = require('supertest');
    var app = require('../../../server/app');

    module.exports = supertest(app);
})();