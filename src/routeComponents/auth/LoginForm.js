import { NavLink } from "react-router-dom";
import imgLoginBackGround from "../../assets/img/Fitness.jpg";

function LoginForm(props) {
  return (
    <div
      className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl mx-auto"
      style={{ maxWidth: "92vw" }}
    >
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage: `url(${imgLoginBackGround})`,
        }}
      ></div>

      <form
        className="w-full px-6 py-8 md:px-8 lg:w-1/2"
        onSubmit={props.handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          So Fit
        </h2>

        <p className="text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome!
        </p>
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="LoggingEmailAddress"
          >
            Email Address
          </label>
          <div>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="email"
              name="email"
              value={props.state.email}
              onChange={props.handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="loggingPassword"
            >
              Password
            </label>
          </div>

          <input
            id="loggingPassword"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            type="password"
            name="password"
            value={props.state.password}
            onChange={props.handleChange}
            required
          />
        </div>

        {props.error !== "" ? (
          <div className="mt-8">
            <div className="w-full px-4 py-2 text-black bg-red-300 border rounded-md ">
              {props.error}
            </div>
          </div>
        ) : null}

        <div className="mt-8">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600">
            Login
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <NavLink
            to="/auth/signup"
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or sign up
          </NavLink>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
