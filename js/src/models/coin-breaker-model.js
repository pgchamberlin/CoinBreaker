define([], function() {

    var 
        /**
         * MVC subscriber support
         */
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
        },
        

        /**
         * Data object
         */
        data = {
            "totalAmount": 0,
            "ones": 0,
            "twos": 0,
            "fives": 0,
            "tens": 0,
            "twenties": 0,
            "fifties": 0,
            "pounds": 0,
            "twoPounds": 0
        },

        /**
         * Setter for data
         *
         * Data is to be set as a complete object for simplicity's sake.
         * The whole data object is passed in the notification to subscribers.
         */
        setData = function(newData) {
            data = newData;
            notify(data);
        },

        /**
         *
         */
        getData = function() {
            return data;
        };

    return {
        subscribe: subscribe,
        notify: notify,
        setData: setData,
        getData: getData
    }
});
