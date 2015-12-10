"use strict";

/**
    asyncAwait test

    FIXME: remove this example code within the second sprint!!!
*/

const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

const expect = chai.expect;

describe('async_await', () => {
    before(() => {
        this.aa = require('../src/async_await');
    });

    it('should exist', () => {
        expect(this.aa).to.exist;
    });

    it('should work', () => {
        let cb = sinon.spy();
        let res = this.aa(cb);
        return res.then(() => {
            expect(cb).to.have.callCount(10);
        });
    });
});
