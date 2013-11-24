define([], function() {

    var validate = function(s) {
        var input = s,
            validState = false,
            pence = 0;

        // trim the input of whitespace
        input.replace(/^\s+|\s+$/g, ''); 

        // check there are no unacceptable characters
        if (/^(£)?[0-9\.]+(p)?$/.test(input)) {

            // the input should in this case always be valid
            validState = true;

            // is there a decimal point or a pound sign?
            if (/(\.|^£)/.test(input)) {
                // yes, then remove £ and p chars
                input = input.replace(/£/, '').replace(/p/, '');

                // parse to float and multiply by 100 to get pence
                pence = parseFloat(input) * 100;

                // now round up pence
                pence = Math.round(pence);
            } else {
                // assume we're working with a pence value

                // remove £ and p chars
                input.replace(/£/, '').replace(/p/, '');

                // we should be able to simply parse the string to an int now
                pence = parseInt(input);
            }
        }

        return {
            isValid: function() {
                return validState;
            },
            toPence: function() {
                return pence;
            }
        }
    }

    return {
        validate: validate
    }
});

