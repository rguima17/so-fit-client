import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import ViewUserCard from "./ViewUserCard";

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

  const [followingPictureArr, setFollowingPictureArr] = useState([]);
  const [followerPictureArr, setFollowerPictureArr] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/view/${id}`);
        setUser({ ...response.data });

        const profile = await api.get(`/user/view/${loggedInUser.user._id}`);

        const followingArray = profile.data.followingId;

        let followingPictures = [];
        let followersPictures = [];

        // Check if already follow user
        for (let i = 0; i < followingArray.length; i++) {
          if (followingArray[i]._id === id) {
            setbuttonClick(true);
          }
        }

        // Set State for following images
        for (let i = 0; i < response.data.followingId.length; i++) {
          followingPictures.push(response.data.followingId[i].pictureUrl);
        }

        // Set State for followers images
        for (let i = 0; i < response.data.followersId.length; i++) {
          followersPictures.push(response.data.followersId[i].pictureUrl);
        }

        setFollowingPictureArr([...followingPictures]);
        setFollowerPictureArr([...followersPictures]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, [id, loggedInUser, buttonClick]);

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
        if (followingArray[i]._id === id) {
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
      console.error(err);
    }
  }

  return (
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
      followingPictures={followingPictureArr}
      followerPictures={followerPictureArr}
    />
  );
}

export default ViewUser;
