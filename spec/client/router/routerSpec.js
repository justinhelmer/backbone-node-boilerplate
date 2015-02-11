define([
  'backbone',
  'router/router',
  'router/private'
], function (Backbone, Router, PrivateAppRouter) {
  'use strict';

  describe('router', function () {
    var router;

    beforeEach(function () {
      router = new Router({});
    });

    describe('#navigate', function () {
      it('when fragment is null, will throw an error', function () {
        expect(function () {
          router.navigate(null);
        }).toThrow();
      });

      it('when fragment is false, will throw an error', function () {
        expect(function () {
          router.navigate(false);
        }).toThrow();
      });

      it('when fragment is empty string, will call Backbone navigate', function () {
        spyOn(PrivateAppRouter, 'updateCurrent').and.returnValue(true);
        spyOn(Backbone.Router.prototype, 'navigate');

        router.navigate('');

        expect(Backbone.Router.prototype.navigate).toHaveBeenCalledWith('', {});
      });
    });
  });
});
