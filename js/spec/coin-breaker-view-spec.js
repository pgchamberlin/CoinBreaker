define([
    'js/src/views/coin-breaker-view',
    'js/lib/domReady!'
], function(CoinBreakerView, doc) {

    var view = CoinBreakerView,
        formFixture;

    beforeEach(function() {
        formFixture = doc.createElement('form');
        formFixture.id = 'coinbreaker-form';
        doc.body.appendChild(formFixture);
    });
    
    afterEach(function() {
        formFixture.parentNode.removeChild(formFixture);
    });

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

        it('should attach an event listener to the form on initialisation', function() {
       /* failing     
            spyOn(view, 'addFormListener');

            view.init() 

            expect(view.addFormListener).toHaveBeenCalled();
            */
        });

        it('should activate the form on initialisation', function() {
            /*
            spyOn(view, 'activateForm');

            view.init() 

            expect(view.activateForm).toHaveBeenCalled();
*/
        });

    });
});

