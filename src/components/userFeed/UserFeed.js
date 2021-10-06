import UserPosts from "../posting/UserPosts";
import FollowingPosts from "../posting/FollowingPosts";
import LikedPosts from "../posting/LikedPosts";
import { NavLink } from "react-router-dom";

function UserFeed() {
  return (
    <div>
      <h2> User Feed</h2>
      <div className="text-center mt-5 ">
        <NavLink
          to={`/profile`}
          className="font-medium text-white bg-black py-2 px-3 rounded-full border-2 border-blue-600 "
        >
          Back to profile
        </NavLink>
      </div>
      <div className="flex justify-center my-7">
        <div className="font-medium bg-black text-white py-2 px-3 rounded-full  border-2 border-blue-600 ">
          <NavLink to="/user-following">People you follow</NavLink>
        </div>
        <div className="font-medium bg-black text-white py-2 px-3 rounded-full  border-2 border-blue-600 ">
          <NavLink to="/all-users">Search for friends</NavLink>
        </div>
      </div>
      <UserPosts />
      <FollowingPosts />
      <LikedPosts />
    </div>
  );
}

export default UserFeed;
