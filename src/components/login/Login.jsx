import { useHistory } from "react-router-dom";
import "./Login.css";
const { Button, TextField } = require("@mui/material");

export default function Login() {
  const history = useHistory();

  return (
    <div className="container">
      <div className="login">
        <h1>Shotgun</h1>

        <TextField className="textbox" label="Course" variant="outlined" />
        <TextField
          className="textbox"
          type="password"
          label="Password"
          variant="outlined"
        />

        <Button
          className="loginButton"
          variant="contained"
          onClick={() => history.push({ pathname: "/Base" })}
        >
          Login
        </Button>

        <p>Or if you're new:</p>

        <Button
          className="signUpButton"
          variant="outlined"
          onClick={() => history.push({ pathname: "/SignUp" })}
        >
          Create a course
        </Button>
      </div>
    </div>
  );
}
