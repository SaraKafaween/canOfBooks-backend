'use strict';

const {userModel} = require('../models/user.model');

const getbooks = (request, response) => {

    const { email } = request.query;
    console.log(request.query.email,'hi');
    console.log(userModel);
    userModel.find({ ownerEmail: email }, (error, user) => { // find the user data that matches email in the userModel collection
        if (error) {
            response.send(error)
        } else {
            response.json(user)
        }
    });
}

module.exports = getbooks;