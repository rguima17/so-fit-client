import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

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
    <div>
      {filteredPosts.length === 0 ? (
        <NavLink to="/all-users">
          <div className="flex flex-col my-48 mx-2 items-center bg-white rounded-md p-2 ">
            <p className="flex items-center">
              You ain't following nobody...
              <i className="fas fa-sad-cry text-indigo-600 pl-4 fa-2x animate-ping"></i>
            </p>
            <p className="pb-1">Or maybe no one you follow has posted any workout</p>
            <p>
              Please, search for{" "}
              <span className="text-indigo-800 font-bold">So Fit&trade;</span>{" "}
              friends:
            </p>
            <button className="bg-indigo-600 text-white animate-bounce rounded-md p-2 mt-4 w-full hover:bg-indigo-700">
              Find friends
            </button>
          </div>
        </NavLink>
      ) : (
        <div className="flex flex-col">
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default FollowingPosts;
