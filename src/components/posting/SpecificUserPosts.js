import { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useParams } from "react-router";

import api from "../../apis/api";


import PostSmallCard from "./PostSmallCard";

function SpecificUserPosts() {
    
  const { id } = useParams()
  const [posts, setPosts] = useState([]);
 
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
    (post) => post.postedBy._id === id
  );
  

  return (
    <div>
      <div className="bg-gray-100 py-1 mb-1 flex text-gray-500 justify-center items-center">
        <span className="whitespace-nowrap text-sm font-medium pr-3">
          <i
            className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-2xl"
            onClick={() => history.goBack()}
          ></i>
        </span>
        <h5 className="font-medium uppercase tracking-wider"> POSTS</h5>
      </div>
      <div className="flex flex-col">
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4">
          {filteredPosts.map((post) => {
            return (
              <div key={post._id}>
                <PostSmallCard
                  id={post._id}
                  post={post}
                  cardCategory="userPost"
                />
              </div>
            );
          })}
        </div>
      </div>
      <NavLink
        className=" fixed z-40 right-1 bottom-12 bg-indigo-600 text-white font-bold rounded-full text-4xl px-2 "
        to="/workout"
      >
        +
      </NavLink>
    </div>
  );
}

export default SpecificUserPosts;