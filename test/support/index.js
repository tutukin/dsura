"use strict";

const path  = require('path');
const chai  = require('chai');
const sinon = require('sinon');
const sap   = require('sinon-as-promised');
const pquire= require('proxyquire');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

module.exports = {
    expect: chai.expect,
    sinon: sinon,
    inject: inject,
    reject: reject
};

function inject (mod, deps) {
    deps = deps || {};
    return pquire(modPath(mod), deps);
}

function reject (mod) {
    delete require.cache[ require.resolve(modPath(mod)) ];
}

function modPath (mod) {
    return path.resolve(__dirname, '..', '..', 'src', mod);
}
