"use strict";

const path  = require('path');
const chai  = require('chai');
const sinon = require('sinon');
const sap   = require('sinon-as-promised');
const pquire= require('proxyquire');
const rd    = require('require-directory');

const EXAMPLES = rd(module, './examples');
const MOCKS = rd(module, './mocks');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

module.exports = {
    expect: chai.expect,
    sinon: sinon,
    require: doRequire,
    retreat: retreat,
    example: example,
    mock: mock
};

function doRequire (mod, deps) {
    deps = deps || {};
    return pquire(modPath(mod), deps);
}

function retreat (mod) {
    delete require.cache[ require.resolve(modPath(mod)) ];
}

function modPath (mod) {
    return path.resolve(__dirname, '..', '..', 'src', mod);
}

function example (name, options) {
    let factory = EXAMPLES[name];
    if ( ! factory ) throw Error(`Define an example '${name}'`);

    return typeof factory === 'function' ?
        factory(options) :
        factory;
}

function mock (name, options) {
    let factory = MOCKS[name];
    if (! factory ) throw Error(`Define mock '${name}'`);

    return factory(options);
}
