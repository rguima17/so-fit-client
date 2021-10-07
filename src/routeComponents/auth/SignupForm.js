import { NavLink } from "react-router-dom";
import imgSignupBackGroud from "../../assets/img/fitness.jpg";
function SignupForm(props) {
  return (
    <div
      className='flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl'
      style={{ maxWidth: "92vw", marginLeft: "auto", marginRight: "auto" }}
    >
      <div
        className='hidden bg-cover lg:block lg:w-1/2'
        style={{
          backgroundImage: `url(${imgSignupBackGroud})`,
        }}
      ></div>

      <form
        className='w-full px-6 py-8 md:px-8 lg:w-1/2'
        onSubmit={props.handleSubmit}
      >
        <h2 className='text-2xl font-semibold text-center text-gray-700 dark:text-white'>
          So Fit
        </h2>

        <p className='text-xl text-center text-gray-600 dark:text-gray-200'>
          Please, register below:
        </p>

        <div className='mt-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
            htmlFor='LoggingEmailAddress'
          >
            Your username
          </label>
          <input
            id='LoggingName'
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            type='text'
            name='name'
            maxLength='15'
            value={props.state.name}
            onChange={props.handleChange}
            required
          />
        </div>
        <div className='mt-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
            htmlFor='LoggingEmailAddress'
          >
            Email Address
          </label>
          <input
            id='LoggingEmailAddress'
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            type='email'
            name='email'
            value={props.state.email}
            onChange={props.handleChange}
            required
          />
        </div>

        <div className='mt-4'>
          <div className='flex justify-between'>
            <label
              className='block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200'
              htmlFor='loggingPassword'
            >
              Password
            </label>
            {/* <a
              href="#"
              className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
            >
              Forget Password?
            </a> */}
          </div>

          <input
            id='loggingPassword'
            className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'
            type='password'
            name='password'
            value={props.state.password}
            onChange={props.handleChange}
            required
          />
        </div>

        <div className='mt-8'>
          <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-gray-600'>
            Sign up!
          </button>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <span className='w-1/5 border-b dark:border-gray-600 md:w-1/4'></span>

          <NavLink
            to='/auth/login'
            className='text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline'
          >
            or Login
          </NavLink>

          <span className='w-1/5 border-b dark:border-gray-600 md:w-1/4'></span>
        </div>
        <div></div>
      </form>
    </div>
  );
}

export default SignupForm;
