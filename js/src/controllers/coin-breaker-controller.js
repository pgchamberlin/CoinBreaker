define([], function() {

    var observe = function(subject) {
            subject.subscribe(onViewChange);
        },
        onViewChange = function(amount) {
            model.setAmount(amount);
        },
        model,
        setModel = function(m) {
            model = m;
        };

    return {
        observe: observe,
        setModel: setModel,
        //
        onViewChange: onViewChange
    }
});

