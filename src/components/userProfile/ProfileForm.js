import { NavLink } from "react-router-dom";

function ProfileForm(props) {
  return (
    <section className="px-1 pt-1 lg:max-w-3xl mx-auto  lg:mt-2" >
      <div className="bg-gray-100 py-1 rounded-md mb-1 flex items-center text-gray-500 justify-center pl-10">
        <span className="pr-6 whitespace-nowrap inline">
          <NavLink
            to={`/profile`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <i className="fas fa-arrow-circle-left text-2xl"></i>
          </NavLink>
        </span>
        <h5 className="inline">Edit your profile</h5>
      </div>
      <form
        onSubmit={props.handleSubmit}
        className="p-4 shadow-md bg-white mx-4 max-w-full rounded-md text-left border-gray-200 mx-auto "
      
      >
        <div className="grid">
          <div className="mb-3">
            <label className="text-gray-700 font-medium">Name</label>
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
            <label className="text-gray-700 font-medium">
              Your description
            </label>
            <textarea
              rows="3"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="description"
              placeholder="Change your Description"
              maxLength="300"
              value={props.profile.description}
              onChange={props.handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-1">
            <label className="text-gray-700 font-medium">Profile picture</label>
            <input
              type="file"
              className="block w-full px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              name="pictureUrl2"
              onChange={props.handleChange}
            />
          </div>
          <div className="mt-3">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600">
              Save profile
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ProfileForm;
