// fixed nodemon update by deleting nodemon.ps1 file... without changing execution policies...

const express = require("express");
const SpotifyApi = require("spotify-web-api-node");
// spotifywebapi would take the code from url to get tokens...

const app = express();

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
      res.sendStatus(400);
    });
});

app.listen(3001);
