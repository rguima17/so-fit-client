import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../apis/api";
import ViewUserCard from "./ViewUserCard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { NavLink } from "react-router-dom";

function ViewUser() {
  const { loggedInUser } = useContext(AuthContext);

  const [user, setUser] = useState({
    name: "",
    description: "",
    pictureUrl: "",
    soFitPoints: 0,
    level: 0,
    _id: "",
    followersId: [],
    followingId: [],
  });

  const [buttonClick, setbuttonClick] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    console.log("useeffect2")
    async function fetchUser() {
      try {
        const response = await api.get(`/user/view/${id}`);
        setUser({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [id, buttonClick]);

  //Follow user
  async function handleFollow() {
    try {
      setbuttonClick(!buttonClick);
      // console.log(loggedInUser.user._id)
      // console.log(userId.id)

      //Check if same User
      if (loggedInUser.user._id === id) {
        // console.log("Cannot follow yourself")
        return null;
      }

      const profile = await api.get(`/user/view/${loggedInUser.user._id}`);

      const followingArray = profile.data.followingId;

      // Check if already follow user
      for (let i = 0; i < followingArray.length; i++) {
        if (followingArray[i] === id) {
          //   console.log("Already follow this user");
          return null;
        }
      }
      await api.post(`/user/view/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  //Unfollow User
  async function handleUnfollow() {
    try {
      setbuttonClick(!buttonClick);
      if (loggedInUser.user._id === id) {
        // console.log("Cannot unfollow yourself")
        return null;
      }
      await api.delete(`/user/view/${id}`);
      //   console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex justify-content-end mr-3">
        <NavLink
          to={`/user-feed`}
          className=" w-25 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Back
        </NavLink>
      </div>
      <ViewUserCard
        name={user.name}
        followersNumber={user.followersId.length}
        followingNumber={user.followingId.length}
        pictureUrl={user.pictureUrl}
        level={user.level}
        description={user.description}
        soFitPoints={user.soFitPoints}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
      />
    </div>
  );
}

export default ViewUser;
