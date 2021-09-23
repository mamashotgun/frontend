import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
const { Button, TextField } = require("@mui/material");

export default function Login() {
  const [courseName, setCourseName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const headers = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}/courses/login`,
        {
          name: courseName,
          password: password,
        },
        headers
      );

      history.push({ pathname: "/Base", params: { course: response.data } });
    } catch (error) {
      console.error(error);
    }
  };

  const history = useHistory();

  return (
    <div className="container">
      <div className="login">
        <h1>Shotgun</h1>

        <TextField
          className="textbox"
          label="Course"
          variant="outlined"
          onChange={(event) => setCourseName(event.target.value)}
          value={courseName}
        />
        <TextField
          className="textbox"
          type="password"
          label="Password"
          variant="outlined"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <Button className="loginButton" variant="contained" onClick={login}>
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
