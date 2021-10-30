import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

function Head() {
  let history = useHistory();
  function navigateToLogin() {
    history.push("/login");
  }
  return (
    <div>
      <h1>Login Page</h1>
      <Button variant="contained" onClick={navigateToLogin}>
        Login
      </Button>
    </div>
  );
}

export default Head;
