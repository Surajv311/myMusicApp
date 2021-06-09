import Login from "./Login.js";
import "bootstrap/dist/css/bootstrap.min.css";

const code = new URLSearchParams(window.location.search).get("code");
// to get the code in the url, to get tokens......url frame: 'code'..

function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
