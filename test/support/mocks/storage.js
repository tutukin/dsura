"use strict";

const sinon = require('sinon');
const sap = require('sinon-as-promised');

module.exports = function (options) {
    options = options || {};
    let storage = {};

    if ( options.models ) storage = addModels(options.models, storage);

    return storage;
};


function addModels (models, storage) {
    if ( typeof models === 'string' ) models = models.split(/[\s,;]+/);
    if ( ! Array.isArray(models) ) throw Error('List of models must be a string or an array');
    return models.reduce( (res, name) => {
        res[name] = mkModel(name);
        return res;
    }, storage);
}

function mkModel (name) {
    return {
        create: sinon.stub(),
        findAll: sinon.stub(),
        $instance: mkInstance(name)
    };
}

function mkInstance (name) {
    return {a: name};
};
