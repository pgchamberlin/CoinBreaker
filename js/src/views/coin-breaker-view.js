define([], function() {

    var observe = function(subject) {
            subject.subscribe(onModelChange);
        },
        onModelChange = function() {
            console.log('onModelChange');
        },
        subscribers = [],
        subscribe = function(callback) {
            subscribers.push(callback);
        },
        notify = function(notification) {
            for (i in subscribers) {
                if (subscribers.hasOwnProperty(i)) {
                    subscribers[i](notification);
                }
            }
        };
/*
    var form = document.getElementById('myform'),
    form.addEventListener('submit', function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        var usertext = document.getElementById('userinput').value,
            pence = stringToPence(usertext),
            coins = greedyCoinDenominator(pence);
        displayCoins(coins);
    });
*/

    return {
        observe: observe,
        subscribe: subscribe,
        // visibility for testing purposes
        // - is it questionable whether this is good practice?
        onModelChange: onModelChange,
        notify: notify
    }
});

