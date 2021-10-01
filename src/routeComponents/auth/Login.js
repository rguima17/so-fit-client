import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import api from "../../apis/api"; //ao inves do axios

import { AuthContext } from "../../contexts/authContext";
import LoginForm from "./LoginForm";

function Login(props) {

  const [state, setState] = useState({ password: "", email: "" });
  
  const history = useHistory();

  // const authContext = useContext(AuthContext); COMENTADO NOVO

  const {loggedInUser, setLoggedInUser} = useContext(AuthContext)


  useEffect(() => {
    // Caso o usuário já esteja logado, redirecione para página principal
    if (loggedInUser.token) {
      history.push("/profile");
    }
  }, [loggedInUser, history]);


  // function handleChange(event) {
  //   setState({ ...state, [event.target.name]: event.target.value });
  // }

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
    
      history.push("/profile");
    } catch (err) {
      console.error(err.response);
     
    }
  }


  return (
    <LoginForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      state={state}
      // erros={errors}
    />
  );
}

export default Login;


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