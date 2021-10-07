import { useHistory, NavLink } from "react-router-dom";

import FollowingPosts from "../posting/FollowingPosts";

function UserFeed() {
  const history = useHistory();

  return (
    <div className="mb-2">
      <div className="flex text-center bg-gray-700 justify-between px-2 py-2 text-2xl text-white items-center hover:text-indigo-900">
        <span className="pr-6 whitespace-nowrap inline">
          <i
            className="fas fa-arrow-circle-left text-indigo-400"
            onClick={() => history.goBack()}
          ></i>
          <i className="fas fa-arrow-circle-left invisible"></i>
        </span>
        <span className="text-indigo-400">So Fit</span>
        <div>
          <NavLink to="/liked-posts">
            <i className="fas fa-heart mr-4 text-red-500"></i>
          </NavLink>
          <NavLink to="/all-users">
            <i className="fas fa-search text-indigo-400"></i>
          </NavLink>
        </div>
      </div>
      <FollowingPosts />
      <NavLink
        className=" fixed z-40 right-1 bottom-12 bg-indigo-600 text-white font-bold rounded-full text-4xl px-2 "
        to="/workout"
      >
        +
      </NavLink>
    </div>
  );
}

export default UserFeed;
