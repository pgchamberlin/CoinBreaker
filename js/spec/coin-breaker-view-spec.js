define([
    'js/src/views/coin-breaker-view'
], function(CoinBreakerView) {

    var view = CoinBreakerView;

    describe('CoinBreakerView', function() {

        it('should subscribe to changes on a model when asked to observe one', function() {

            // create a mock model to spy on what the view does internally
            var mockModel = {
                subscribe: function(callback) {}
            };
            spyOn(mockModel, 'subscribe');

            // ask the view to observe the mock model
            view.observe(mockModel);

            // check the view subscribes to the mock model with the onModelChange event
            expect(mockModel.subscribe).toHaveBeenCalledWith(view.onModelChange);
        });

        /**
         * The following tests both view.subscribe() and view.notifySubscribers()
         * - it should probably be refactored to test them individually
         */
        it('should update subscribers with user input when it is submitted', function() {

            var mockSubscriber = {
                    callback: function() {}
                },
                mockUpdateValue = '134trfdsf';
            spyOn(mockSubscriber, 'callback');

            // subscribe the mock
            view.subscribe(mockSubscriber.callback);

            // fire the notification
            view.notify(mockUpdateValue);

            // check that the mock was called with the mock value
            expect(mockSubscriber.callback).toHaveBeenCalledWith(mockUpdateValue);
        });

    });
});

