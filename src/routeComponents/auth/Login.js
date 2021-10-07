import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";
import LoginForm from "./LoginForm";

function Login() {
  const [state, setState] = useState({ password: "", email: "" });
  const [error, setError] = useState("");

  const history = useHistory();

  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    // If user is already loggedIn, redirect it to the profile page
    if (loggedInUser.token) {
    
      history.push("/profile");
    }
  }, [loggedInUser, history,error]);

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("")
    try {
      const response = await api.post("/login", state);

      setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      
      history.push("/profile");
    } catch (err) {
      
      setError(err.response.data.msg);
    }
  }

  return (
    <div className="mt-10">
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        state={state}
        error={error}
      />
    </div>
  );
}

export default Login;
