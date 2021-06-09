import { useState, useEffect } from "react";
import axios from "axios";

export default function Auth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios // posting our code to that route...
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        window.location = "/";
      }); // if we get error we redirect user to home route... JS.....
  }, [code]);
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
