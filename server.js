'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa'); // we are going to use this package to connect to Auth0
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const JWKSURI = process.env.JWKSURI;
const MONGO_DB_URL =process.env.MONGO_DB_URL;
const {seedUserData} = require('./models/user.model');
const getBooks = require('./controller/book.controller');
app.use(cors());

mongoose.connect(`${MONGO_DB_URL}books`, { useNewUrlParser: true, useUnifiedTopology: true });


const client = jwksClient({
  jwksUri: JWKSURI
});



function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
 


app.get('/test', (request, response) => {
const token = request.headers.authorization.split(' ')[1]; // take the token from frontend
jwt.verify(token, getKey, {}, (error, user) =>{ // pass it to the auth to check the token if its valid
  if(error){
    response.send('invalid token');
  }
  response.json(user);//send user information in the state from auth
});
});

seedUserData();

app.get('/books',getBooks);





 
  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end



  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });