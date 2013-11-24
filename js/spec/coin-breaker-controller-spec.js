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

        it('should update the model when the view updates', function() {
            
            var mockModel = {
                setData: function(data) {}
            },
            mockData = 'thisIsMockData';
            spyOn(mockModel, 'setData');

            controller.setModel(mockModel);

            controller.onViewChange(mockData);

            expect(mockModel.setData).toHaveBeenCalledWith(mockData);
        });
    });
});

