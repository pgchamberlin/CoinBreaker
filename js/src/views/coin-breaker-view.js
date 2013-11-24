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
            // updateOutputView(data);
            console.log('onModelChange');
            console.log(data);
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

        inputError = function(usertext) {
            console.log('invalid input: ' + usertext);
        },

        //
        handleFormSubmit = function(target) {
            var usertext = target.querySelector('#breakable-amount').value,
                sterlingValue = validator.validate(usertext);
            console.log(usertext);
            if (sterlingValue.isValid()) {
                notify(sterlingValue.toPence());
            } else {
                inputError(usertext);
            }
        },

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

