"use strict";

// TODO: this must not be here!!!!!!!!!!!
const GROUP_ID = 6;

const mailer = require('./mailer');
const storage = require('./storage');
const model = require('./model')(storage);
const uuid = require('node-uuid');

const E = require('./error');

module.exports = {
    authorize: authorize
};

function authorize (user, client, action) {
    return {
        perform: (data) => _perform(user, client, action, data)
    };
}


async function _perform (user, client, action, data) {
    let AuthTableRows = await model('AuthTable').findAll({ where: {
        action: action,
        resource: 'EPerson'
    }});

    let userRoles = user.roles;

    let matchedRoles = AuthTableRows.filter( row => {
        return userRoles.indexOf(row.role) >= 0;
    });

    if ( matchedRoles.length === 0 ) throw E.AuthError();

    let eperson = await model('EPerson').create({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        language: 'ru',
        can_log_in: true
    });

    let invitation = await model('Invitation').create({
        email: data.email,
        token: uuid.v1().replace(/-/g, '')
    });

    let group = eperson.addEPersonGroup({
        group_id: GROUP_ID
    });

    let res = mailer.sendInvitation(data.email, invitation.token);

    return eperson;
}
