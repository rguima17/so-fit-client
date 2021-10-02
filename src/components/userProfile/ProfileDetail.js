import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";
import { NavLink } from "react-router-dom";

function ProfileDetail() {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/profile");
        //  console.log(response.data)

        setProfile({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div>
      <div className="max-w-sm mt-4 mx-auto overflow-hidden bg-white  rounded-lg shadow-lg dark:bg-gray-800">
        <img
          className="object-fill  object-top w-full h-56 "
          src={profile.pictureUrl}
          alt={`User ${profile.name}`}
        />
        <div className="text-center  py-3  bg-gray-900">
          <h1 className="mx-3 mb-0 text-xl font-bold text-white">
            Welcome to your profile !
          </h1>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between mb-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {profile.name}
            </h1>
            <NavLink to={`/profile/edit/${profile._id}`} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </NavLink>
          </div>
          <p className="py-2  font-semibold text-lg text-gray-700 dark:text-gray-400">
            About: {profile.description}
          </p>

          <div className="flex items-center mt-4 ">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              Level: {profile.level}
            </p>
          </div>

          <div className="flex items-center mt-4">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              {" "}
              SoFit Points: {profile.soFitPoints}
            </p>
          </div>
        </div>

        <div className="flex justify-content-end mr-4" >
         
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={logout} style={{ cursor: "pointer" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
