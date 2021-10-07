import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import PostSmallCard from "./PostSmallCard";

function LikedPosts() {
  const [filteredPosts, setfilteredPosts] = useState([]);

  const { loggedInUser } = useContext(AuthContext);
  const history = useHistory();

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
      <div className="bg-gray-100 py-1 rounded mb-1 flex text-gray-500 justify-center items-center">
        <span className="whitespace-nowrap text-sm font-medium pr-3">
          <i
            className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-lg"
            onClick={() => history.goBack()}
          ></i>
        </span>
        <h5 className="font-medium uppercase tracking-wider">
          MY LIKED WORKOUTS
        </h5>
      </div>

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
