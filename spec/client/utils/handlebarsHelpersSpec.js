define([
  'handlebars',
  'utils/handlebarsHelpers'
], function (Handlebars) {
  describe('handlebars helpers', function () {
    var template;

    describe('encodeURIComponent', function () {
      beforeEach(function () {
        template = Handlebars.compile('{{ encodeURIComponent q }}');
      });

      it('should encode all characters', function () {
        expect(template({q: 'blue&jeans'})).toEqual('blue%26jeans');
      });
    });
  });
});