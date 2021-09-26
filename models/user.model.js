'use strict';

const mongoose = require('mongoose');
const bookSchema = require('./book.model');



const userSchema = new mongoose.Schema({
    ownerEmail: { type: String },
    books: [bookSchema]
});

const userModel = mongoose.model('users', userSchema);


const seedUserData =() => {
    const newUser = new userModel({ // create new obj
        ownerEmail: 'marahaltarefe18@gmail.com',
        books: [
            {
                title: 'The Alchemist',
                description: 'The Alchemist’ tells the enthralling story of an Andalusian shepherd who wants to travel in search of treasure. But during his adventures, he finds himself, instead,” said Varga. “Coelho shows us the journey that matters—a journey of lessons and charming stories of snakes, love, dunes and alchemy.',
                status: 'available'
            },
            {
                title: 'Half of a Yellow Sun',
                description: 'When Nigerian author Adichie was growing up, the Biafran war “hovered over everything”. Her sweeping, evocative novel, which won the Orange prize, charts the political and personal struggles of those caught up in the conflict and explores the brutal legacy of colonialism in Africa.',
                status: 'available'
            },
            {
                title:'Alone Time',
                description:'​​Four cities, four seasons, and countless tables for one. In this memoir, Stephanie Rosenbloom explores the joys of solo adventuring.',
                status: 'available'
            },
        ]
    })

    newUser.save(); // save the data into database

}

module.exports = {userModel , seedUserData}