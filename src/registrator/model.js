"use strict";

var STORAGE = null;

module.exports = function (storage) {
    if ( typeof storage === 'string' ) return getModel(storage);
    if ( STORAGE ) throw Error(`Storage already injected`);
    STORAGE = storage;
    return getModel;
};

function getModel (modelName) {
    if ( ! STORAGE || ! STORAGE[modelName] ) throw Error(`Define model '${modelName}'`);
    return STORAGE[modelName];
};
