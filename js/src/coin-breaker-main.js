/**
 * This module is responsible for initialising the CoinBreaker app, and
 * does so by instantiating the Model, View, and Controller for the app
 * and setting up the observation / updates between them.
 */

define([
    'models/coin-breaker-model',
    'views/coin-breaker-view',
    'controllers/coin-breaker-controller'
], function (CoinBreakerModel, CoinBreakerView, CoinBreakerController){

    // these variables will remain private
    var model = CoinBreakerModel,
        view = CoinBreakerView,
        controller = CoinBreakerController,

        // this variable will become public
        init = function () {
            view.observe(model);
            controller.observe(view);
            controller.setModel(model);
            view.render();
        };

    // this is the exposed interface to the app
    return {
        init: init
    };
});

