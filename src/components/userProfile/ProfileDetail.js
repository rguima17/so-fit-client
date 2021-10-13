import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

import api from "../../apis/api";

import LoadingSpinner from "../structure/loading/LoadingSpinner";

import rankingImg from "../../assets/icons/ranking.png";
import soFitLogo from "../../assets/img/Logo.png";

function ProfileDetail() {
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    pictureUrl: "",
    soFitPoints: 0,
    level: 0,
    _id: "",
    followersId: [],
    followingId: [],
  });

  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const soFitColor = "#6366F1";

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const response = await api.get("/profile");
        setProfile({ ...response.data });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return loading ? (
    <div>
      <LoadingSpinner />
    </div>
  ) : (
    <div className=" rounded-2xl lg:flex lg:max-w-3xl  md:flex my-2 mx-auto overflow-hidden bg-white shadow-lg dark:bg-gray-800 mx-auto">
      <div className="lg:w-2/5  md:w-1/2">
        <div className="flex text-center py-3 px-4 bg-indigo-500 justify-between lg:h-14">
          <h1 className="text-xl font-bold text-white">{profile.name}</h1>
          <NavLink
            to={`/profile/edit/${profile._id}`}
            className="text-white hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-6 inline animate-pulse mr-3"
              fill="none"
              viewBox="0 0 24 28"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-6 mr-0 inline animate-pulse text-red-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </NavLink>
        </div>
        <div className="w-84  mx-auto">
          <img
            className="object-top object-cover lg:object-cover"
            src={profile.pictureUrl}
            alt={`User ${profile.name}`}
          />
        </div>
        <div className="text-center py-3 bg-indigo-500">
          <h1 className="mx-2 mb-0 text-white font-light italic text-md text-center">
            {profile.description}
          </h1>
        </div>
      </div>

      <div className="lg:w-3/5 md:w-1/2 mt-auto mb-auto lg:my-0">
        <div className="lg:flex lg:flex-col lg:justify-between ">
          <div
            className=" lg:h-14"
            style={{ backgroundColor: soFitColor }}
          ></div>
          <div className="table px-6 py-4 h-60 text-center w-full text-gray-600 dark:text-gray-400">
            <div className="table-row">
              <span className="font-medium table-cell">Level</span>
              <NavLink to="/points-leaderboard">
                <span className="font-medium table-cell ">So Fit Points</span>
              </NavLink>
            </div>
            <div className="table-row">
              <p className="text-3xl table-cell pl-4">
                <span className="pr-4">{profile.level}</span>
                <img
                  src={rankingImg}
                  alt="ranking-icon"
                  style={{ height: "32px", display: "inline" }}
                />
              </p>
              <NavLink to="/points-leaderboard">
                <p className="text-3xl table-cell pl-2">
                  <span className="pr-2">
                    {Number(profile.soFitPoints.toFixed(0)).toLocaleString(
                      "pt-BR"
                    )}
                  </span>
                  <img
                    src={soFitLogo}
                    alt="soFit-icon"
                    style={{ height: "32px", display: "inline" }}
                  />
                </p>
              </NavLink>
            </div>
            <div className="table-row">
              <NavLink to="/user-following" className="font-medium table-cell">
                Following
              </NavLink>
              <NavLink to="/user-followers" className="font-medium table-cell">
                Followers
              </NavLink>
            </div>
            <div className="table-row">
              <NavLink to="/user-following" className="text-3xl table-cell">
                <span className="pr-4">{profile.followingId.length}</span>
                <i
                  className="fas fa-running fa-flip-horizontal"
                  style={{ color: soFitColor }}
                ></i>
              </NavLink>
             
              <NavLink to="/user-followers" className="text-3xl table-cell">
                  <span className="pr-4">{profile.followersId.length}</span>
                  <i
                    className="fas fa-running"
                    style={{ color: soFitColor }}
                  ></i>
                
              </NavLink>
            </div>
          </div>

          <div className="flex mx-2">
            <NavLink
              to={`/workout`}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600 animate-bounce text-center mr-2"
            >
              Your workouts
            </NavLink>
            <NavLink
              to={`/your-posts`}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600 animate-bounce text-center 
            ml-2"
            >
              Your posts
            </NavLink>
          </div>
          <div className="flex mx-2 mt-4">
            <NavLink
              to={`/user-feed`}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600 animate-bounce text-center"
            >
              Go to your feed
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
