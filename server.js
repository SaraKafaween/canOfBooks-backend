'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa'); // we are going to use this package to connect to Auth0
const PORT = process.env.PORT;
const JWKSURI = process.env.JWKSURI;
app.use(cors())

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

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });