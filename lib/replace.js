var replace = (function() {
    var replace = function(contract, replacement) {
        var oc, prop, k, i;
        if (contract.ctype === "object") {
            oc = contract.oc;
            for (prop in oc) {
                k = oc[prop];
                if (k === Dummy) {
                    oc[prop] = replacement;
                }
                if (k.ctype === "fun") {
                    if (k.callrng === Dummy) {
                        k.callrng = replacement;
                    }
                    if (k.newrng === Dummy) {
                        k.newrng = replacement;
                    }
                    for (i = 0; i < k.calldom.length; i ++) {
                        if (k.calldom[i] === Dummy) {
                            k.calldom[i] = replacement;
                        }
                    }
                    for (j = 0; j < k.newdom.length; i++ ){
                        if (k.newdom[i] === Dummy) {
                            k.newdom[i] = replacement;
                        }
                    }
                }
            }
        }

    }
    return replace;
})(this);