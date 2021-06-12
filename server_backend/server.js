require("dotenv").config();

// fixed nodemon update by deleting nodemon.ps1 file... without changing execution policies...

const express = require("express");
const SpotifyApi = require("spotify-web-api-node");
// spotifywebapi would take the code from url to get tokens...
const cors = require("cors");
const bodyParser = require("body-parser"); //  body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body

const lyricsFinder = require("lyrics-finder");

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

var clientId_ = process.env.CLIENT_ID;
var clientSecret_ = process.env.CLIENT_SECRET;
//const redirectUri_ = "http://localhost:3000/callback/"; //   redirectUri_:  'http://localhost:3000/',
var redirectUri_ = process.env.__REDIRECT_URI;

// var clientId_ = "";
// var clientSecret_ = "";
// //const redirectUri_ = "http://localhost:3000/callback/"; //   redirectUri_:  'http://localhost:3000/',
// var redirectUri_ = "http://localhost:3000/callback";

//docs
var credentials = {
  clientId: clientId_, // dotenv...
  clientSecret: clientSecret_,
  redirectUri: redirectUri_,
};

app.post("/login", (req, res) => {
  const code = req.body.code;
  // taking the 'code' portion of body
  console.log(req.body);
  const api_login = new SpotifyApi(credentials);
  // we get tokens once we authorize the code, in url...
  api_login
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

// setting up the refresh access token...following docs
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const api_refresh = new SpotifyApi({
    // redirectUri: redirectUri_,
    // clientId: clientId_,
    // clientSecret: clientSecret_,
    credentials,
    refreshToken, // also need to pass refreshToken
  });

  api_refresh
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "Lyrics not found! Try Again :("; // we passed artist & query track... if lyrics found then fine else, not found....
  res.json({ lyrics });
});

app.listen(3001);
