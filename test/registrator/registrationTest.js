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
        this.action = 'create';
        this.storage = T.mock('storage', {models: 'EPerson AuthTable Invitation'});
        this.mailer = T.mock('mailer');

        this.mailer['@noCallThru'] = this.storage['@noCallThru'] = true;

        this.r = T.require('registrator', {
            './storage': this.storage,
            './mailer': this.mailer
        });
    });

    beforeEach( () => {
        let AuthTable = this.storage.AuthTable;
        AuthTable.findAll.rejects(Error('incorrect query to AuthTable!'));
        AuthTable.findAll
            .withArgs( T.sinon.match({where:{
                action: 'create',
                resource: 'EPerson'
            }}))
            .resolves([{role:'librarian'}, {role: 'admin'}]);
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
                    let EPerson = this.storage.EPerson;
                    let Invitation = this.storage.Invitation;

                    EPerson.create.resolves(EPerson.$instance);
                    Invitation.create.resolves(Invitation.$instance);
                    this.result = this.r.authorize(this.user, this.client, this.action)
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

                it('should generate Invitation for the reader', () => {
                    let Invitation = this.storage.Invitation;

                    expect(Invitation.create).calledOnce
                        .and.calledWithExactly(T.sinon.match({
                            email: this.data.email,
                            token: T.sinon.match.string
                        }));
                });

                it('should add the reader to "readers" groups', () => {
                    let EPerson = this.storage.EPerson;

                    expect(EPerson.$instance.addEPersonGroup).calledOnce
                        .and.calledWithExactly(T.sinon.match({
                            group_id: T.sinon.match.number
                        }));
                });

                it('should send by email an invitation to the user', () => {
                    expect(this.mailer.sendInvitation).calledOnce
                        .and.calledWithExactly(this.data.email, this.storage.Invitation.$instance.token);
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




    context('when the user is not a librarian, who uses a registered client', () => {
        beforeEach( () => {
            this.user = T.example('user', {roles: ['labrador']});
            this.client = T.example('client');
            this.data = T.example('EPersonData');
        });

        beforeEach( () => {
            // Note: beyond Authorization everything is correct,
            // and storage would respond with the created EPerson!
            let EPerson = this.storage.EPerson;
            EPerson.create.resolves(EPerson.$instance);
        });

        context('then registrator responds with an error', () => {
            beforeEach( () => {
                this.result = this.r.authorize(this.user, this.client, this.action)
                    .perform(this.data);
            });

            it('should reject the request for registration with the AuthError', () => {
                return expect(this.result).to.be.rejected
                    .and.eventually.have.property('name')
                    .that.equals('AuthError');
            });
        });
    });
});
