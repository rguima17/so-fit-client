import { useState, useEffect } from "react";
import api from "../../apis/api";
import { NavLink } from "react-router-dom";

import AllUsersCard from "./AllUsersCard";

function UserFollowing() {


  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const user = await api.get("/profile");
        setFollowing([...user.data.followingId]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="text-center mt-5">
        <NavLink
          to={`/user-feed`}
          className=" font-medium text-white bg-black py-2 px-3 rounded-full  border-2 border-blue-600 "
        >
          Back to your Feed
        </NavLink>
      </div>
      <div className="text-center mt-5">
        <p className = "font-semibold text-3xl">People you Follow</p>
      </div>
      <div className="relative w-full sm: ml-3 ">
        <div className="relative w-full px-4 pt-16 pb-16 mx-auto bg-top bg-cover max-w-6xl lg:py-24 lg:pb-32">
          <div className="grid gap-10 row-gap-8 ml-auto mr-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3  ">
            {following.map((user) => {
              return (
                <div key={user._id}>
                  <AllUsersCard
                    id={user._id}
                    name={user.name}
                    pictureUrl={user.pictureUrl}
                    followers={user.followers}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFollowing;
