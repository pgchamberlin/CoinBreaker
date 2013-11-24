define([
    '../util/coin-breaker'
], function(CoinBreaker) {

    var 
        /**
         * MVC controller behaviour methods
         */    
        observe = function(subject) {
            subject.subscribe(onViewChange);
        },
        onViewChange = function(input) {
            handleViewChange(input);
        },
        model,
        setModel = function(m) {
            model = m;
        },
        /**
         *  
         */

        /**
         * This handler takes the updated input value from
         * the view, gets the new value for the model's
         * data, and then sets it back in the model.
         */
        handleViewChange = function(input) {
            var newData = getNewData(input);
            model.setData(newData);
        },

        /**
         * Takes an amount in pence as input, uses the coin
         * breaker utility to work out the minimum Sterling
         * coin composition, and templates these values into
         * a suitable model data object
         */
        getNewData = function(input) {
            var optimalChange = CoinBreaker.denominate(input);
            return {
                'totalAmount': input,
                'ones': optimalChange['ones'],
                'twos': optimalChange['twos'],
                'fives': optimalChange['fives'],
                'tens': optimalChange['tens'],
                'twenties': optimalChange['twenties'],
                'fifties': optimalChange['fifties'],
                'pounds': optimalChange['pounds'],
                'twoPounds': optimalChange['twoPounds']
            }
        };
    
    return {
        observe: observe,
        setModel: setModel,
        // exposed for testing purposes:
        onViewChange: onViewChange
    }
});

