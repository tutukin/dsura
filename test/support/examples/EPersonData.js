"use strict";

const faker = require('faker');

module.exports = function (options) {
    return {
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName()
    };
};
