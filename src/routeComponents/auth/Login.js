import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";
import LoginForm from "./LoginForm";

function Login(props) {
  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const history = useHistory();

  // const authContext = useContext(AuthContext); COMENTADO NOVO

  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    // Caso o usuário já esteja logado, redirecione para página principal
    if (loggedInUser.token) {
      history.push("/profile");
    }
  }, [loggedInUser, history]);

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

      setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      history.push("/profile");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div>
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        state={state}
        errors={errors}
      />
    </div>
  );
}

export default Login;
