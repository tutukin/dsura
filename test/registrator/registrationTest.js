"use strict";

const T = require('../support');
const expect = T.expect;

/**
    As a librarian
    I may register a reader
    Providing her email and name
*/

describe('registrator/registration', function () {
    beforeEach( () => {
        this.storage = T.mock('storage', {models: 'EPerson'});
        this.storage['@noCallThru'] = true;

        this.r = T.require('registrator', {
            './storage': this.storage
        });
    });

    afterEach( () => {
        T.retreat('registrator');
        T.retreat('registrator/model');
    });

    it('should exist', () => {
        expect(this.r).to.exist;
    });




    context('when the user is a librarian and uses a registered client', () => {
        beforeEach( () => {
            this.user = T.example('user', {roles: ['librarian']});
            this.client = T.example('client');
        });

        context('given the user provides valid email and password of a reader', () => {
            beforeEach( () => {
                this.data = T.example('EPersonData');
            });

            context('then registrator registers a user', () => {
                beforeEach( () => {
                    // TODO: configure storage and mailer
                    let EPerson = this.storage.EPerson;
                    EPerson.create.resolves(EPerson.$instance);
                    this.result = this.r.authorize(this.action, this.user, this.client)
                        .perform(this.data);

                    return this.result;
                });

                it('should insert new reader to the storage', () => {
                    let EPerson = this.storage.EPerson;
                    expect(EPerson.create).calledOnce
                    .and.calledWithExactly( T.sinon.match({
                        email: this.data.email,
                        language: 'ru',
                        firstname: this.data.firstname,
                        lastname: this.data.lastname,
                        can_log_in: true
                    }) );
                });

                it('should be resolved with the reader instance', () => {
                    return expect(this.result)
                        .to.eventually.equal(this.storage.EPerson.$instance);
                });
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
