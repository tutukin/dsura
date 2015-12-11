"use strict";

const storage = require('./storage');
const model = require('./model')(storage);


module.exports = {
    authorize: authorize
};

function authorize (user, client, action) {
    return {
        perform: (data) => _perform(user, client, action, data)
    }
}


function _perform (user, client, action, data) {
    return model('EPerson').create({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        language: 'ru',
        can_log_in: true
    });
}
