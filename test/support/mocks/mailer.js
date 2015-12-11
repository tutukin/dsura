"use strict";

const sinon = require('sinon');
const sap = require('sinon-as-promised');

module.exports = function (options) {
    return {
        sendInvitation: sinon.stub()
    };
};
