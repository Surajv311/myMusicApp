// fixed nodemon update by deleting nodemon.ps1 file... without changing execution policies...

const express = require("express");
const SpotifyApi = require("spotify-web-api-node");
// spotifywebapi would take the code from url to get tokens...
const cors = require("cors");
const bodyParser = require("body-parser"); //  body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
const app = express();

// middleware
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

/*

Middleware functions are functions that have access to the request object ( req ), 
the response object ( res ), and the next function in the application's request-response cycle.

Eg. // middleware function 
var express = require('express')
var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

*/

const clientId_ = "CLIENT_CODE";
const clientSecret_ = "SECRET_CODE";

//docs
var credentials = {
  //   redirectUri:  'http://localhost:3000/',
  redirectUri: "http://localhost:3000/callback/",
  clientId: clientId_, // dotenv...
  clientSecret: clientSecret_,
};

app.post("/login", (req, res) => {
  const code = req.body.code;
  // taking the 'code' portion of body
  console.log(req.body);
  const api = new SpotifyApi(credentials);
  // we get tokens once we authorize the code, in url...
  api
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(3001);
