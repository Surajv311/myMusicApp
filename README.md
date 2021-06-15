## Music app using Spotify's API

The frontend is built using React integrated with
Node backend to parse Spotify API requests to 
play music. 

<br>

![Login](https://github.com/Surajv311/myMusicApp/blob/main/pics/1.png) <br>
![Auth](https://github.com/Surajv311/myMusicApp/blob/main/pics/2.png) <br>
![Search Music](https://github.com/Surajv311/myMusicApp/blob/main/pics/3.png) <br>

----------------------------------------------------------

### To set up the project locally:

`Step 1`: Install dependencies using `npm i` in both client & server side. <br>
`Step 2`: Got to [Spotify_Dashboard](https://developer.spotify.com/dashboard/) and create a new app. <br>
`Step 3`: Make a note of the Client_Id & the Client_Secret. <br>
`Step 4`: In the edit settings of your dashboard put the redirect uri as : `http://localhost:3000/callback`. <br>
`Step 5`: Now got to your server dir. and create a `.env` file. <br>
`Step 6`: In the file declare your Client_Id, Redirect_uri, Client_Secret as : 

``` 
__REDIRECT_URI=http://localhost:3000/callback/
CLIENT_ID=(you made note of) 
CLIENT_SECRET=(you made note of) 

```
<br>

`Step 7`: To run the backend, use - `nodemon server.js`. <br>
`Step 8`: To run the frontend, use - `npm start`. <br>
`Step 9`: Done!. <br>

----------------------------------------------------------
