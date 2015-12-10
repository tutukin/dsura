"use strict";

/**
    @module asyncAwait

    Lazy counter

    FIXME: remove this example code within the second sprint!!!
*/

module.exports = async function (cb, k) {
    k = typeof k === 'number' ?
        k : 0;

    let i;

    while ( k < 10 ) {
        i = await lazyNumber(k++);
        if (!cb) console.log(`Got ${i}`);
        else cb(i);
    }
};

function lazyNumber (n) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve(n);
        }, 500);
    });
}
