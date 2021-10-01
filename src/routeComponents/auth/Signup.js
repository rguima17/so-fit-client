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
      // history.push("/auth/login");
      history.push("/auth/login");
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    // <section className='max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
    //   <h2 className='text-lg font-semibold text-gray-700 capitalize dark:text-white'>
    //     Account settings
    //   </h2>

    //   <form onSubmit={handleSubmit}>
    //     <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
    //       <div>
    //         <label className='text-gray-700 dark:text-gray-200' for='username'>
    //           Username
    //         </label>
    //         <input
    //           type='text'
    //           name='name'
    //           id='signupFormName'
    //           value={state.name}
    //           error={errors.name}
    //           onChange={handleChange}
    //           className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
    //         />
    //       </div>

    //       <div>
    //         <label
    //           className='text-gray-700 dark:text-gray-200'
    //           for='emailAddress'
    //         >
    //           Email Address
    //         </label>
    //         <input
    //           type='email'
    //           name='email'
    //           id='signupFormEmail'
    //           value={state.email}
    //           error={errors.email}
    //           onChange={handleChange}
    //           className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
    //         />
    //       </div>

    //       <div>
    //         <label className='text-gray-700 dark:text-gray-200' for='password'>
    //           Password
    //         </label>
    //         <input
    //           type='password'
    //           name='password'
    //           id='signupFormPassword'
    //           value={state.password}
    //           error={errors.password}
    //           onChange={handleChange}
    //           className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
    //         />
    //       </div>

    //       <div>
    //         <label
    //           className='text-gray-700 dark:text-gray-200'
    //           for='passwordConfirmation'
    //         >
    //           Password Confirmation
    //         </label>
    //         <input
    //           id='passwordConfirmation'
    //           type='password'
    //           className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
    //         />
    //       </div>
    //     </div>

    //     <div className='flex justify-end mt-6'>
    //       <button className='px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
    //         Save
    //       </button>
    //     </div>
    //   </form>
    // </section>

    <SignupForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      state={state}
      errors={errors}
    />
  );
}

export default Signup;
