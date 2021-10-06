import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../apis/api";
import SignupForm from "./SignupForm";

function Signup() {
  const [state, setState] = useState({ name: "", password: "", email: "" });

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
      history.push("/auth/login");
    } catch (err) {
      console.error(err.response);
    }
  }

  return (
    <div className="mt-10">
      <SignupForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        state={state}
      />
    </div>
  );
}

export default Signup;
