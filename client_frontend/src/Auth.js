import { useState, useEffect } from "react";
import axios from "axios";

export default function Auth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios // posting our code to that route...
      .post("http://localhost:3001/login", {
        code, // passing the {code} to the port 3001
      })
      .then((res) => {
        // we get response after sending {code} to server in login route...
        // console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, 0, "/");
        // this web API would modify the URL ...to remove the 'code' part of the url...keeping url clean...
      })
      .catch(() => {
        window.location = "/";
      }); // if we get error we redirect user to home route... JS.....
  }, [code]); // useEffect executed whenever {code} changes... app rendered...

  /*
our access token expires after an 1hr (checked in v8 engine console) and logs out. So what we 
must do is refresh the token by itself in the backend rather than our user doing it.
*/

  // so we run useEffect whenever our refreshToken/expiresIn changes in the backend.
  // with this our user wouldn't be logged out.

  // similar to earlier useEffect...
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    /*the condition would avoid this useEffect to run when page loads,
    as if it runs with out this condition then actually we are refreshing 
    the token before it was created...*/

    // using setInterval() instead of setTimeout() to refresh it & execute it at intervals than once...which setTimeout() does
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 180) * 1000); // refreshing it 3mins before actual timeout... (*1000 used to convert to milliseconds...)

    return () => clearInterval(interval); // clearing interval...
  }, [refreshToken, expiresIn]); // whenever refresh token expires or expiresIn changes, we run it.

  return accessToken;
}

//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON

/*
Browsers like chrome/firefox/... have policy that doesn't allow 
website to request data from one url to another. 
To avoid errors we install cors [CROSS ORIGIN RESOURCE SHARING].
Your website(frontend) may fetch data from API (backend)
may throw errors...if cors not installed as 
website follows same origin policy...as a part of security policy...
blocking your request to fetch data from external URL.

If request from a origin goes to same URL
like frontend ~ localhost3000 & request goes to backend ~localhost3000
then fine, but we need different backend URL for testing say localhost3001,
If we do that then browser won't allow since its cross origin request.
To avoid errors, we install cors. 
We install cors middleware in our server backend to avoid this 
issue with the browser.
*/
