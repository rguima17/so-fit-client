import { useState, useEffect, useContext } from "react";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import LoadingSpinner from "../structure/loading/LoadingSpinner";
import PostSmallCard from "./PostSmallCard";

function FollowingPosts() {
  const { loggedInUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likeButtonClick, setLikeButtonClick] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await api.get("/postings");
        setPosts([...response.data]);

        const profile = await api.get("/profile");
        let arr = [];

        for (let i = 0; i < profile.data.followingId.length; i++) {
          arr.push(profile.data.followingId[i]["_id"]);
        }
        setFollowing([...arr]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, [likeButtonClick]);

  const filteredPosts = posts.filter(
    (post) => following.indexOf(post.postedBy._id) >= 0
  );

  async function handleLike(targetPostObj) {
    if (loggedInUser.user._id === targetPostObj.postedBy._id) {
      return null;
    }

    //Check if already liked the post
    for (let i = 0; i < targetPostObj.likes.length; i++) {
      if (targetPostObj.likes[i] === loggedInUser.user._id) {
        try {
          await api.delete(`/post/like/${targetPostObj._id}`);
          setLikeButtonClick(!likeButtonClick);
        } catch (err) {
          console.error(err);
        }
        return null;
      }
    }

    try {
      await api.post(`/post/like/${targetPostObj._id}`);
      setLikeButtonClick(!likeButtonClick);
    } catch (err) {
      console.error(err);
    }
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      {filteredPosts.map((post) => {
        return (
          <div key={post._id}>
            <PostSmallCard
              id={post._id}
              post={post}
              handleLike={handleLike}
              cardCategory="followingPost"
            />
          </div>
        );
      })}
    </>
  );
}

export default FollowingPosts;
