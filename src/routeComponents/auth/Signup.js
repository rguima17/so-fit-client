import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../apis/api";
import SignupForm from "./SignupForm";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
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
      await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      history.push("/auth/login");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div>
      <SignupForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        state={state}
        errors={errors}
      />
    </div>
  );
}

export default Signup;
