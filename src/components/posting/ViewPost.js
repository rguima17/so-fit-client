import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import ViewPostCard from "./ViewPostCard";
import CommentPost from "./CommentPost";

function ViewPost() {
  const { loggedInUser } = useContext(AuthContext);

  const [post, setPost] = useState({
    name: "",
    comments: [],
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
  const [commentButtonClick, setCommentButtonClick] = useState(false);
  const [profileUser, setProfileUser] = useState({
    name: "",
    pictureUrl: "",
  });

  const [comment, setComment] = useState({
    text: "",
    postedBy: "",
    postedByName: "",
    postedByPicture: "",
  });

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchPost() {
      try {
        //Information about post
        const response = await api.get(`/posting/${id}`);
        setPost({ ...response.data });

        //Information about user for comments
        const profile = await api.get("/profile");
        setProfileUser({
          name: profile.data._id,
          pictureUrl: profile.data.pictureUrl,
        });

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
  }, [id, likeButtonClick, commentButtonClick]);

  //Delete post
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

  //Like Button
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

  //Function for the comments
  function handleChange(event) {
    setComment({
      ...comment,
      text: event.target.value,
      postedBy: loggedInUser.user._id,
      postedByName: loggedInUser.user.name,
      postedByPicture: profileUser.pictureUrl,
    });
  }

  // Submit the comment
  async function handleComment(event) {
    event.preventDefault();

    if (comment.text === "") {
      return null;
    }

    try {
      await api.put(`/post/comment/${id}`, comment);
      setComment({
        text: "",
      });
      setCommentButtonClick(!commentButtonClick);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <ViewPostCard
        post={post}
        exercises={exercises}
        deletePost={deletePost}
        handleLike={handleLike}
      />

      <CommentPost
        commentList={post.comments}
        comment={comment}
        handleChange={handleChange}
        handleComment={handleComment}
      />
    </>
  );
}

export default ViewPost;
