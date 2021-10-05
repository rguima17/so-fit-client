import { useState, useEffect } from "react";
import api from "../../apis/api";
import { NavLink } from "react-router-dom";
import PostSmallCard from "./PostSmallCard";

function FollowingPosts() {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/postings");
        setPosts([...response.data]);

        const profile = await api.get("/profile");
        let arr = [];

        for (let i = 0; i < profile.data.followingId.length; i++) {
          arr.push(profile.data.followingId[i]["_id"]);
        }
        setFollowing([...arr]);

        console.log(arr);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) => following.indexOf(post.postedBy._id) >= 0
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
      <h3>Your Folllowing Posts</h3>

      {filteredPosts.map((post) => {
        return (
          <div key={post._id}>
            <PostSmallCard
              id={post._id}
              name={post.name}
              pictureUrl={post.pictureUrl}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FollowingPosts;
