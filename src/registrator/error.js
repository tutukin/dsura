"use strict";

const ERRORS = {
    AuthError: 'Access forbidden'
};

module.exports = Object.keys(ERRORS).reduce( (obj, key) => {
    obj[key] = msg => _error(key, msg, ERRORS[key]);
    return obj;
}, {});

function _error (name, msg, defaultMsg) {
    let e = Error( msg || defaultMsg );
    e.name = name;
    return e;
}
