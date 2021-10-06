import { useState, useEffect, useContext } from "react";

import api from "../../apis/api";

import { AuthContext } from "../../contexts/authContext";

import PostSmallCard from "./PostSmallCard";

function LikedPosts() {
  const { loggedInUser } = useContext(AuthContext);

  const [filteredPosts, setfilteredPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/postings");

        let arr = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].likes.indexOf(loggedInUser.user._id) > -1) {
            arr.push(response.data[i]);
          }
        }
        setfilteredPosts([...arr]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, [loggedInUser]);

  return (
    <div>
      <h3>Your Liked Workouts</h3>

      {filteredPosts.map((post) => {
        return (
          <div key={post._id}>
            <PostSmallCard id={post._id} post={post} cardCategory="likedPost" />
          </div>
        );
      })}
    </div>
  );
}

export default LikedPosts;
