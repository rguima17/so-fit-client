import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import LoginForm from "./LoginForm";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const history = useHistory();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      history.push("/workout");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      state={state}
      errors={errors}
    />
  );
}

export default Login;
