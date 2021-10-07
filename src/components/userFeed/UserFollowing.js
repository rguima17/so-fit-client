import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";

import AllUsersCard from "./AllUsersCard";

function UserFollowing() {
  const [following, setFollowing] = useState([]);
  const history = useHistory();

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
      <div className="bg-gray-100 py-1 mb-1 flex text-gray-500 justify-center items-center">
        <span className="whitespace-nowrap text-sm font-medium pr-3">
          <i
            className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-2xl"
            onClick={() => history.goBack()}
          ></i>
        </span>
        <h5 className="font-medium uppercase tracking-wider">Your Following</h5>
      </div>
      <div className="mx-2 my-2 lg:py-24 lg:pb-32">
        <div className="grid gap-5 row-gap-8 ml-auto mr-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3  ">
          {following.map((user) => {
            return (
              <div key={user._id}>
                <AllUsersCard
                  id={user._id}
                  name={user.name}
                  pictureUrl={user.pictureUrl}
                  followers={user.followersId.length}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserFollowing;
