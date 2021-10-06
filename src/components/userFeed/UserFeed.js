import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import FollowingPosts from "../posting/FollowingPosts";

function UserFeed() {
  const history = useHistory();

  return (
    <div className="mb-2">
      <div className="flex text-center bg-gray-100 justify-between px-2 py-2 text-2xl text-indigo-600 items-center hover:text-indigo-900">
        <span className="pr-6 whitespace-nowrap inline">
          <i
            className="fas fa-arrow-circle-left"
            onClick={() => history.goBack()}
          ></i>
          <i className="fas fa-arrow-circle-left text-gray-100"></i>
        </span>
        So Fit
        {/* <i className="fas fa-dumbbell"></i> */}
        <div>
          <NavLink to="/liked-posts">
            <i className="fas fa-heart pr-2"></i>
          </NavLink>
          <NavLink to="/all-users">
            <i className="fas fa-search"></i>
          </NavLink>
        </div>
      </div>
      <FollowingPosts />
    </div>
  );
}

export default UserFeed;
