"use strict";

const U = module.exports = {};

U.mkObject = (FIELDS, options) => {
    options = options || {};

    return FIELDS.reduce((obj, key) => {
        if ( key in options ) obj[key] = U.deepCopy(options[key]);
        return obj;
    }, {});
};


const cloneArray = value => value.map( el => U.deepCopy(el) );
const cloneObject = value => {
    return Object.keys(value).reduce((obj, key) => {
        obj[key] = _copy(value[key]);
        return obj;
    }, {});
};

U.deepCopy = (value) => {
    return Array.isArray(value) ?
            cloneArray(value) :
        typeof value === 'object' ?
            cloneObject(value) :
            value
};
