"use strict";

const T = require('../support');
const expect = T.expect;

/**
    As a librarian
    I may register a reader
    Providing her email and name
*/

describe('registrator/registration', () => {
    beforeEach( () => {
        this.r = T.inject('registrator');
    });

    afterEach( () => {
        T.reject('registrator');
    });

    it('should exist', () => {
        expect(this.r).to.exist;
    });




    context('when the user is a librarian', () => {
        context('given the user provides valid email and password of a reader', () => {
            context('then registrator registers a user', () => {
                //how
            });

            context('and the storage responds with an error', () => {
                //
            });
        });



        context('given the user provides invalid email and password', () => {
            context('then registrator responds with a validation error', () => {
                //how
            });
        });
    });




    context('when the user is not a librarian', () => {
        context('then registrator responds with an error', () => {
            //how
        });
    });
});
