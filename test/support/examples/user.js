"use strict";

const U = require('../utils');

const FIELDS = 'roles'.split(' ');

module.exports = function (options) {
    return U.mkObject(FIELDS, options);
};
