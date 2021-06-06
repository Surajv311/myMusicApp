import React from "react";
import { Container } from "react-bootstrap";

const client_id = "585eaa2fa9ec4891a14bff801067f8d8";
const redirect_uri = "http://localhost:3000/callback/";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

// troubleshooted error, since we must add callback endpoint in both js & on web... : https://github.com/spotify/web-api-auth-examples/issues/41

// "https://accounts.spotify.com/authorize?client_id=f673f8eb405e48909a2dde629405d4b6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

// now we must covert 'code' token we got in the url...
//Token is a string that server generates for the client that can be passed along inside http request...

const Login = () => {
  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <a className="btn btn-primary btn-lg" href={AUTH_URL}>
          Login with your Spotify Account
        </a>
      </Container>
    </div>
  );
};

export default Login;
