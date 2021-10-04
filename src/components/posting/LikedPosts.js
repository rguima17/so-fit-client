import { useState, useEffect } from "react";
import api from "../../apis/api";
import { NavLink } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import PostSmallCard from "./PostSmallCard"

function LikedPosts() {
  const { loggedInUser } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);
  

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/postings");
        setPosts([...response.data]);
        console.log(response.data.length)
        console.log(response.data)
        console.log(response.data[0])
        console.log(response.data[0].likes)
        console.log(loggedInUser.user._id)

        let arr = [];
        for (let i = 0; i < response.data.length; i++) {
        
          if (response.data[i].likes.indexOf(loggedInUser.user._id) > -1 ) {
            arr.push(response.data[i]);
          }
        }
        setfilteredPosts([...arr]);

        console.log(arr);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, []);

  
 

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
      <h3>Your Liked Workouts</h3>

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

export default LikedPosts;
