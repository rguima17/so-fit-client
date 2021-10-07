import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import api from "../../apis/api";

import likeBtn from "../../assets/icons/likeBtn.png";
import soFitLogo from "../../assets/img/Logo.png";

function PostSmallCard(props) {
  const [workoutTotalPoints, setWorkoutTotalPoints] = useState(0);

  const soFitColor = "#6366F1";

  // Calculating this workout total points
  useEffect(() => {
    let totalPoints = 0;

    async function fetchWorkoutPoints() {
      const cloneArr = [...props.post.workoutId.exercisesId];

      for (let i = 0; i < cloneArr.length; i++) {
        try {
          const response = await api(`/exercise/${cloneArr[i]}`);
          totalPoints += response.data.exerciseTotalPoints;
        } catch (err) {
          console.error(err);
        }
      }
      if (workoutTotalPoints === 0) {
        setWorkoutTotalPoints(totalPoints);
      }
    }
    fetchWorkoutPoints();
  }, [workoutTotalPoints, props.post.workoutId.exercisesId]);

  return (
    <div className="shadow-lg mx-2 mt-2 rounded-2xl bg-white dark:bg-gray-800 p-2 max-w-md bg-gray-200">
      <NavLink to={`/post/${props.id}`}>
        <div className="flex-row flex justify-between items-center pb-2">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                src={props.post.pictureUrl}
                className="mx-auto object-cover rounded-full h-24 w-24"
                alt="workout"
              />
            </div>
          </div>
          <div className=" flex flex-col pr-2">
            <span className="text-gray-600 dark:text-white text-lg font-bold text-right">
              {props.post.name}
            </span>
            <div className="text-right">
              {workoutTotalPoints === 0 ? (
                <img
                  src={soFitLogo}
                  alt="soFit-icon"
                  className="animate-spin"
                  style={{ height: "16px", display: "inline" }}
                />
              ) : (
                <>
                  <span className="text-gray-500 text-sm pr-1">
                    {Number(workoutTotalPoints.toFixed(0)).toLocaleString(
                      "pt-BR"
                    )}
                  </span>
                  <img
                    src={soFitLogo}
                    alt="soFit-icon"
                    style={{ height: "16px", display: "inline" }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </NavLink>

      <div className="flex justify-between border-t border-indigo-600 px-2 pt-2">
        <div className="flex items-center">
          <button
            className="flex bg-indigo-100 rounded-full p-1 animate-pulse mr-2"
            onClick={() => {
              if (props.cardCategory === "followingPost") {
                props.handleLike(props.post);
              }
            }}
          >
            <span className="font-bold pr-1" style={{ color: soFitColor }}>
              {props.post.likes.length}
            </span>
            <img
              src={likeBtn}
              className="mx-auto object-cover h-5 w-5"
              alt="like-btn"
            />
          </button>
          <NavLink
            className="flex bg-indigo-100 rounded-full p-1 animate-pulse items-center"
            style={{ color: soFitColor }}
            to={`/post/${props.id}`}
          >
            <span className="font-bold pr-1">{props.post.comments.length}</span>
            <i className="fas fa-comments"></i>
          </NavLink>
        </div>
        <div className="flex">
          <span className="text-light text-gray-600 dark:text-gray-400 pr-2">
            {props.post.postedBy.name}
          </span>
          <img
            src={props.post.postedBy.pictureUrl}
            className="mx-auto object-cover rounded-full h-6 w-6"
            alt="workout"
          />
        </div>
      </div>
    </div>
  );
}

export default PostSmallCard;
