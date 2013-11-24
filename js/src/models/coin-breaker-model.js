define([], function() {

    var subscribers = [],
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

    return {
        subscribe: subscribe,
        notify: notify
    }
});
