define([
    'js/src/controllers/coin-breaker-controller'
], function(CoinBreakerController) {

    var controller = CoinBreakerController;

    describe('CoinBreakerController', function() {

        it('should subscribe to changes on a view when asked to observe one', function() {

            // create a mock view to spy on what the view does internally
            var mockView = {
                subscribe: function(callback) {}
            };
            spyOn(mockView, 'subscribe');

            // ask the view to observe the mock view
            controller.observe(mockView);

            // check the view subscribes to the mock view with the onViewChange event
            expect(mockView.subscribe).toHaveBeenCalledWith(controller.onViewChange);
        });

        it('should update the amount fields of its model when the view updates', function() {
            
            var mockModel = {
                setAmount: function(amount) {}
            },
            mockAmount = 1551241;
            spyOn(mockModel, 'setAmount');

            controller.setModel(mockModel);

            controller.onViewChange(mockAmount);

            expect(mockModel.setAmount).toHaveBeenCalledWith(mockAmount);
        });
    });
});

