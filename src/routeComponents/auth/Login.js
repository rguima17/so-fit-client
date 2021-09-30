import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import api from "../../apis/api";

import { AuthContext } from "../../contexts/authContext";

import LoginForm from "./LoginForm";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  // const [errors, setErrors] = useState({
  //   email: null,
  //   password: null,
  // });

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
      // setErrors({ password: "", email: "" });
      history.push("/");
    } catch (err) {
      console.error(err.response);
      // setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      state={state}
      // erros={errors}
    />
    /* <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <div>
        <label htmlFor="signupFormEmail">E-mail Address</label>
        <input
          type="email"
          name="email"
          id="signupFormEmail"
          value={state.email}
          error={errors.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="signupFormPassword">Password</label>
        <input
          type="password"
          name="password"
          id="signupFormPassword"
          value={state.password}
          error={errors.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <button type="submit">Login!</button>

        <Link to="/auth/signup">
          Don't have an account? Click here to signup!
        </Link>
      </div>
    </form> */
  );
}

export default Login;
