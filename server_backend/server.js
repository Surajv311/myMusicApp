// fixed nodemon update by deleting nodemon.ps1 file... without changing execution policies...

const express = require("express");
const SpotifyApi = require("spotify-web-api-node");

const app = express();

const clientId_ = "CLIENT_CODE";
const clientSecret_ = "SECRET_CODE";

var credentials = {
  //   redirectUri:  'http://localhost:3000/',
  redirectUri: "http://localhost:3000/callback/",
  clientId: clientId_, // dotenv...
  clientSecret: clientSecret_,
};

app.post("/login", (req, res) => {
  const code = req.body.code;
  const temp = new SpotifyApi(credentials);
});
