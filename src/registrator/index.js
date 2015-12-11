"use strict";

const storage = require('./storage');
const model = require('./model')(storage);

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

    return model('EPerson').create({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        language: 'ru',
        can_log_in: true
    });
}
