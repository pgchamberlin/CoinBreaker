define([
    'js/src/models/coin-breaker-model'
], function(CoinBreakerModel) {

    var model;

    describe('CoinBreakerModel', function() {

        beforeEach(function() {
            model = CoinBreakerModel;
        });

        it('should accept subscribers and notify them onChange', function() {

            var mockSubscriber = {
                callback: function() {}
            },
            mockUpdateValue = 'amockvalue';
            spyOn(mockSubscriber, 'callback');

            // subscribe the mock
            model.subscribe(mockSubscriber.callback);

            model.notify(mockUpdateValue);

            // check that the mock was called with the mock value
            expect(mockSubscriber.callback).toHaveBeenCalledWith(mockUpdateValue);
        });

    });
});

