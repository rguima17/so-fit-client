import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import PostSmallCard from "./PostSmallCard";

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const { loggedInUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/postings");
        setPosts([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) => post.postedBy._id === loggedInUser.user._id
  );

  return (
    <div>
      <div className="bg-gray-100 py-1 rounded mb-1 flex text-gray-500 justify-center items-center">
        <span className="whitespace-nowrap text-sm font-medium pr-3">
          <i
            className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-2xl"
            onClick={() => history.goBack()}
          ></i>
        </span>
        <h5 className="font-medium uppercase tracking-wider">MY POSTS</h5>
      </div>

      {filteredPosts.map((post) => {
        return (
          <div key={post._id}>
            <PostSmallCard id={post._id} post={post} cardCategory="userPost" />
          </div>
        );
      })}
    </div>
  );
}

export default UserPosts;
