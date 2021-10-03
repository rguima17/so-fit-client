import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../apis/api";
import ViewUserCard from "./ViewUserCard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

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

  const userId = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/view/${userId.id}`);
        setUser({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [user.followersId, user.followingId ]);

  async function handleFollow() {
    try {
      const profile = await api.get(`/user/view/${loggedInUser.user._id}`);

      const followingArray = profile.data.followingId;

      for (let i = 0; i < followingArray.length; i++) {
        if (followingArray[i] == userId.id) {
          console.log("Already follow this user");
          return null;
        }
      }
       await api.post(`/user/view/${userId.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUnfollow() {
    try {
      const response = await api.delete(`/user/view/${userId.id}`);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
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
