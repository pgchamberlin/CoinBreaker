define([
    '../../lib/domReady!',
    '../util/sterling-validator'
], function(doc, SterlingValidator) {

    var validator = SterlingValidator,

        /**
         * The following methods are boilerplate for MVC view behaviour
         */
        observe = function(subject) {
            subject.subscribe(onModelChange);
        },
        onModelChange = function(data) {
            refreshView(data);
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
        },
        /**
         * End of view behaviour methods
         */

        /**
         * The rest of the methods deal with managing the CoinBreaker view
         */
        form = doc.getElementById('coinbreaker-form'),

        output = doc.getElementById('coins-broken'),

        /**
         * This method attaches the handleFormSubmit handler
         * for form submission. This is as minimal as possible
         * as we're not going to test it.
         */
        addFormListener = function() {
            form.addEventListener('submit', function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                handleFormSubmit(e.currentTarget);
            });
        },

        /**
         *
         */
        activateForm = function() {
            form.querySelector('#breakable-amount').disabled = false;
        },

        setOutput = function(newOutput) {
            output.innerHTML = newOutput;
        },

        inputError = function(usertext) {
            setOutput("<p>Invalid input: " + usertext + ", please enter a Sterling amount.</p>");
        },

        /**
         * This method runs validation on the user input
         * and either notifies its subscribers (if the
         * input is valid) or raises an error message
         */
        handleFormSubmit = function(target) {
            var usertext = target.querySelector('#breakable-amount').value,
                sterlingValue = validator.validate(usertext);
            if (sterlingValue.isValid()) {
                notify(sterlingValue.toPence());
            } else {
                inputError(usertext);
            }
        },

        /**
         * This method updates the view of the coin breakdown
         */
        refreshView = function(data) {
            setOutput("<p>The optimum coins required to make up " + data['totalAmount'] + "p are:</p>" +
                "<ul>" +
                "<li>" + data['ones'] + " x 1p</li>" +
                "<li>" + data['twos'] + " x 2p</li>" +
                "<li>" + data['fives'] + " x 5p</li>" +
                "<li>" + data['tens'] + " x 10p</li>" +
                "<li>" + data['twenties'] + " x 20p</li>" +
                "<li>" + data['fifties'] + " x 50p</li>" +
                "<li>" + data['pounds'] + " x &pound;1</li>" +
                "<li>" + data['twoPounds'] + " x &pound;2</li>" +
                "</ul>");
        }

        /**
         * The init method sets up the working state of the app
         */
        init = function() {
            addFormListener();
            activateForm();
        };

    /**
     * We return our public interface, which includes a number of
     * methods which are only public for testing purposes. This
     * is a drawback of the module pattern I've employed. 
     */
    return {
        observe: observe,
        subscribe: subscribe,
        init: init,
        // tested "private" methods:
        onModelChange: onModelChange,
        notify: notify,
        handleFormSubmit: handleFormSubmit,
        addFormListener: addFormListener,
        activateForm: activateForm
    }
});

