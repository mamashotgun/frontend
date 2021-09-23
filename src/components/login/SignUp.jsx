import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
const { Button, TextField } = require("@mui/material");

export default function SignUp() {
  const [courseName, setCourseName] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const history = useHistory();

  const onSubmit = async () => {
    const headers = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_ADDRESS}/courses`,
      {
        name: courseName,
        password: password,
        is_admin: false,
        display_name: displayName,
      },
      headers
    );

    localStorage.setItem("course", JSON.stringify(response.data));

    history.push({ pathname: "/Base" });
  };

  return (
    <div className="container">
      <div className="signUp">
        <form>
          <h1>Create a course</h1>

          <TextField
            required
            className="textbox"
            label="Course user name"
            variant="outlined"
            onChange={(event) => setCourseName(event.target.value)}
            value={courseName}
          />
          <TextField
            required
            className="textbox"
            label="Course display names"
            variant="outlined"
            onChange={(event) => setDisplayName(event.target.value)}
            value={displayName}
          />
          <TextField
            required
            type="password"
            className="textbox"
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          <Button
            className="createButton"
            variant="contained"
            onClick={onSubmit}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
