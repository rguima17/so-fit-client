import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import PostSmallCard from "./PostSmallCard";

function UserPosts() {
  const { loggedInUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

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
      <div className="flex justify-content-end mr-3">
        <NavLink
          to={`/profile`}
          className=" w-25 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Back
        </NavLink>
      </div>
      <h3>Your Posts</h3>

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
