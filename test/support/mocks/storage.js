"use strict";

const sinon = require('sinon');
const sap = require('sinon-as-promised');

var k = 1;

const RELATIONS = {
    EPerson: {
        addEPersonGroup: 'stub',
        eperson_id: k++
    },

    Invitation: {
        token: 'aaaaa-bbbbb-cccccc-0' + k++ 
    }
};

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
    let instance = {
        // common instance interface
    };

    // relations
    if ( RELATIONS[name] ) {
        instance = extendInstance(RELATIONS[name], instance);
    }

    return instance;
};


function extendInstance (ext, instance) {
    return Object.keys(ext).reduce( (obj, key) => {
        let value = ext[key];

        obj[key] = value === 'stub' ?
            sinon.stub() :
            value;

        return obj;
    }, instance);
}
