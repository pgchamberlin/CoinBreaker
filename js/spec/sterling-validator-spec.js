define([
    'js/src/util/sterling-validator'
], function(SterlingValidator) {

    var validator = SterlingValidator,
        
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

    describe('SterlingValidator', function() {

        var successData = [
            ["4", 4],
            ["85", 85],
            ["197p", 197],
            ["2p", 2],
            ["1.87", 187],
            ["£1.23", 123],
            ["£2", 200],
            ["£10", 1000],
            ["£1.87p", 187],
            ["£1p", 100],
            ["£1.p", 100],
            ["001.41p", 141],
            ["4.235p", 424],
            ["£1.257422457p", 126]
        ],
        failureData = [
            ["", 0],
            ["1x", 0],
            ["£1x.0p", 0],
            ["£p", 0]
        ];

        using('Valid Sterling amount strings', successData, function(value, expected) {
            it('should convert each string to the correct pence value', function() {

                var sterlingValue = validator.validate(value);
                expect(sterlingValue.isValid()).toBe(true);
                expect(sterlingValue.toPence()).toBe(expected);

            });
        });

        using('Invalid Sterling amount strings', failureData, function(value, expected) {
            it('should report invalid and have a toPence() value of 0', function() {

                var sterlingValue = validator.validate(value);
                expect(sterlingValue.isValid()).toBe(false);
                expect(sterlingValue.toPence()).toBe(0);

            });
        });

    });
});

