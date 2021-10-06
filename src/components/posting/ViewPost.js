import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import ViewPostCard from "./ViewPostCard";

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
    <ViewPostCard
      post={post}
      exercises={exercises}
      deletePost={deletePost}
      handleLike={handleLike}
    />
  );
}

export default ViewPost;
