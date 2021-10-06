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

  const [buttonClick, setbuttonClick] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/view/${id}`);
        setUser({ ...response.data });

        const profile = await api.get(`/user/view/${loggedInUser.user._id}`);

        const followingArray = profile.data.followingId;

        // Check if already follow user
        for (let i = 0; i < followingArray.length; i++) {
          if (followingArray[i] === id) {
            setbuttonClick(true);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [id, buttonClick]);

  //Follow user
  async function handleFollow() {
    try {
      const profile = await api.get(`/user/view/${loggedInUser.user._id}`);
      const followingArray = profile.data.followingId;

      //Check if same User
      if (loggedInUser.user._id === id) {
        return null;
      }

      // Check if already follow user
      for (let i = 0; i < followingArray.length; i++) {
        if (followingArray[i] === id) {
          try {
            await api.delete(`/user/view/${id}`);
            setbuttonClick(!buttonClick);
          } catch (err) {
            console.error(err);
          }
          return null;
        }
      }

      await api.post(`/user/view/${id}`);
      setbuttonClick(!buttonClick);
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
      <ViewUserCard
        name={user.name}
        followersNumber={user.followersId.length}
        followingNumber={user.followingId.length}
        pictureUrl={user.pictureUrl}
        level={user.level}
        description={user.description}
        soFitPoints={user.soFitPoints}
        handleFollow={handleFollow}
       
        buttonClick={buttonClick}
      />
    </div>
  );
}

export default ViewUser;
