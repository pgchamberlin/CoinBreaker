define([
    'js/src/util/coin-breaker'
], function(CoinBreaker) {

    var breaker = CoinBreaker,
        
    /**
     * We're going to implement the data provider pattern, which Jasmine
     * doesn't have built in.
     *
     * I have lifted this method from: 
     * http://blog.jphpsf.com/2012/08/30/drying-up-your-javascript-jasmine-tests
     */
    using = function(name, values, func) {
        for (var i = 0, count = values.length; i < count; i++) {
            if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
                values[i] = [values[i]];
            }
            func.apply(this, values[i]);
            jasmine.currentEnv_.currentSpec.description += ' (with "' + name + '" using ' + values[i].join(', ') + ')';
        }
    };

    describe('CoinBreaker', function() {

        var validData = [
            [388, {
                "ones": 1,
                "twos": 1,
                "fives": 1,
                "tens": 1,
                "twenties": 1,
                "fifties": 1,
                "pounds": 1,
                "twoPounds": 1
            }],
            [18, {
                "ones": 1,
                "twos": 1,
                "fives": 1,
                "tens": 1,
                "twenties": 0,
                "fifties": 0,
                "pounds": 0,
                "twoPounds": 0
            }],
            [1234, {
                "ones": 0,
                "twos": 2,
                "fives": 0,
                "tens": 1,
                "twenties": 1,
                "fifties": 0,
                "pounds": 0,
                "twoPounds": 6
            }]
        ],
        invalidData = [
            [3188, {
                "ones": 0,
                "twos": 0,
                "fives": 0,
                "tens": 0,
                "twenties": 0,
                "fifties": 0,
                "pounds": 0,
                "twoPounds": 1
            }],
            [388, {
                "ones": 0,
                "twos": 0,
                "fives": 0,
                "tens": 0,
                "twenties": 0,
                "fifties": 0,
                "pounds": 0,
                "twoPounds": 0
            }],
            [1, {
                "ones": 0,
                "twos": 2,
                "fives": 1,
                "tens": 1,
                "twenties": 1,
                "fifties": 1,
                "pounds": 1,
                "twoPounds": 6
            }]
        ];
        
        using('valid input / data pairs', validData, function(input, expected) {

            it('should correctly denominate the input amount', function() {

                var denominations = breaker.denominate(input);
                expect(denominations['ones']).toBe(expected['ones']);
                expect(denominations['twos']).toBe(expected['twos']);
                expect(denominations['fives']).toBe(expected['fives']);
                expect(denominations['tens']).toBe(expected['tens']);
                expect(denominations['twenties']).toBe(expected['twenties']);
                expect(denominations['fifties']).toBe(expected['fifties']);
                expect(denominations['pounds']).toBe(expected['pounds']);
                expect(denominations['twoPounds']).toBe(expected['twoPounds']);

            });

        });

        using('invalid input / data pairs', invalidData, function(input, expected) {

            it('should fail to correctly denominate the input amount', function() {

                var denominations = breaker.denominate(input);
                expect(denominations['ones']).not.toBe(expected['ones']);
                expect(denominations['twos']).not.toBe(expected['twos']);
                expect(denominations['fives']).not.toBe(expected['fives']);
                expect(denominations['tens']).not.toBe(expected['tens']);
                expect(denominations['twenties']).not.toBe(expected['twenties']);
                expect(denominations['fifties']).not.toBe(expected['fifties']);
                expect(denominations['pounds']).not.toBe(expected['pounds']);
                expect(denominations['twoPounds']).not.toBe(expected['twoPounds']);

            });

        });
    });
});


