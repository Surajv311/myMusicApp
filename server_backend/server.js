require("dotenv").config();

const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var clientId_ = process.env.CLIENT_ID;
var clientSecret_ = process.env.CLIENT_SECRET;
var redirectUri_ = process.env.__REDIRECT_URI;

var credentials = {
  clientId: clientId_,
  clientSecret: clientSecret_,
  redirectUri: redirectUri_,
};

app.post("/login", (req, res) => {
  const code = req.body.code;
  const api_login = new SpotifyWebApi(credentials);
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

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const api_refresh = new SpotifyWebApi({
    // redirectUri: redirectUri_,
    // clientId: clientId_,
    // clientSecret: clientSecret_,
    credentials,
    refreshToken,
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
    "Lyrics not found! Try Again :(";
  res.json({ lyrics });
});

app.listen(3001);
