import { NavLink } from "react-router-dom";

function ProfileForm(props) {
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-bold text-gray-700 capitalize dark:text-white">
        Profile Edit
      </h2>

      <form onSubmit={props.handleSubmit}>
        <div className="grid">
          <div className="mb-3">
            <label className="text-gray-700  font-semibold dark:text-gray-200 mb-1" >Name:</label>

            <input
              type="text"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="name"
              placeholder="Change your Name"
              value={props.profile.name}
              onChange={props.handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700  font-semibold dark:text-gray-200 mb-1">
              {" "}
              Description:
            </label>
            <textarea
              maxLength="500"
              rows="3"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="description"
              placeholder="Change your Description"
              value={props.profile.description}
              onChange={props.handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-1">
            <label className="text-gray-700 font-semibold dark:text-gray-200 mb-1 ">Picture:</label>
            <input
              type="file"
              className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="pictureUrl2"
              placeholder="Change your picture"
              onChange={props.handleChange}
            />
          </div>

          <div className="flex justify-between mt-6  items-center">
            <div >
              <NavLink
                to={`/profile`}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Back
              </NavLink>
            </div>
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ProfileForm;
