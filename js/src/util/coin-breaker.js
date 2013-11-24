define([], function() {

    var denominate = function(amount) {
        var denominations = {
                'twoPounds': 200,
                'pounds': 100,
                'fifties': 50,
                'twenties': 20,
                'tens': 10,
                'fives': 5,
                'twos': 2,
                'ones': 1
            },
            counts = {
                'ones': 0,
                'twos': 0,
                'fives': 0,
                'tens': 0,
                'twenties': 0,
                'fifties': 0,
                'pounds': 0,
                'twoPounds': 0
            };

        // This is an optimisation for performance on large integers,
        // and prevents a lot of unnecessary iteration
        if (amount > 999) {
            // Dividing the amount by 1000 and discarding the remainder
            // we get the number of pounds0 units
            var tenners = Math.floor(amount / 1000),
            // We subtract the ten units from the amount (by modulo)
            amount = amount % 1000;
            // and add the pounds0s' value to the count of twoPounds units
            counts['twoPounds'] += tenners * 5;
        }

        // iterate over the denominations in descending order of size
        for (i in denominations) {
            // If the amount is greater than the current denomination
            while (amount >= denominations[i]) {
                // Subtract the denomination value from the amount
                amount -= denominations[i];
                // ... and increment the count for that coin
                counts[i] += 1;
            }
        }

        return counts;
    };

    return {
        denominate: denominate
    }
});
