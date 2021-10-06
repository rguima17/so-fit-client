import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../apis/api";
import ViewPostCard from "./ViewPostCard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { NavLink } from "react-router-dom";

function ViewPost() {
  const { loggedInUser } = useContext(AuthContext);

  const [post, setPost] = useState({
    name: "",
    createdDate: "",
    pictureUrl: "",
    description: "",
    likes: [],
    workoutId: {
      exercisesId: [],
    },
    postedBy: {
      name: "",
    },
  });

  const [likeButtonClick, setLikeButtonClick] = useState(false);
  const [exercises, SetExercises] = useState([]);
  
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/posting/${id}`);
        // console.log(response.data);
        setPost({ ...response.data });

        let arr = [];
        for (let i = 0; i < response.data.workoutId.exercisesId.length; i++) {
          arr.push(response.data.workoutId.exercisesId[i].exerciseName);
        }
        SetExercises([...arr]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPost();
  }, [id, likeButtonClick]);

  async function deletePost() {
    if (loggedInUser.user._id !== post.postedBy._id) {
      return null;
    }

    try {
      await api.delete(`/posting/delete/${id}`);
      history.push("/user-feed");
    } catch (err) {
      console.error(err);
    }
  }


  async function handleLike() {
    if (loggedInUser.user._id === post.postedBy._id) {
      return null;
    }

   
    //Check if already liked the post
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i] === loggedInUser.user._id) {
        try {
          await api.delete(`/post/like/${id}`); 
          setLikeButtonClick(!likeButtonClick);
        } catch (err) {
          console.error(err);
        }
        return null;
      }
    }

    try {
      await api.post(`/post/like/${id}`);
      setLikeButtonClick(!likeButtonClick);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex justify-content-end mr-3">
        <NavLink
          to={`/user-feed`}
          className=" w-25 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Back
        </NavLink>
      </div>
      <ViewPostCard
        name={post.name}
        createdDate={post.createdDate}
        pictureUrl={post.pictureUrl}
        description={post.description}
        likes={post.likes.length}
        exercises={exercises}
        deletePost={deletePost}
        handleLike={handleLike}
        postedBy ={post.postedBy.name}
      />
    </div>
  );
}

export default ViewPost;
