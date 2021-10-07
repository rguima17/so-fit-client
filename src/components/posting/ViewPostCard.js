import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

import likeBtn from "../../assets/icons/likeBtn.png";

import getUnitByExerciseName from "../../scripts/getUnitByExerciseName";
import pickCategoryImage from "../../scripts/pickExerciseCategory";

function ViewPostCard(props) {
  const { loggedInUser } = useContext(AuthContext);
  const history = useHistory();

  const soFitColor = "#6366F1";

  return (
    <div className="max-w-sm mt-2 mx-2 overflow-hidden bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
      <img
        className="object-fill object-top w-full h-56 "
        src={props.post.pictureUrl}
        alt={`User ${props.post.name}`}
      />
      <div className="px-4 py-4">
        <div className="sm:px-6 text-center">
          <div className="flex  justify-center items-center text-lg font-medium text-gray-900">
            <span className="whitespace-nowrap font-medium">
              <i
                className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-2xl"
                onClick={() => history.goBack()}
              ></i>
            </span>
            <span className="pl-3 pr-3"> {props.post.name}</span>
            {props.post.postedBy._id === loggedInUser.user._id ? (
              <i
                className="fas fa-times text-red-400"
                onClick={props.deletePost}
              ></i>
            ) : (
              <button
                className="inline bg-indigo-100 rounded-full p-1 animate-pulse"
                onClick={props.handleLike}
              >
                <span className="font-bold pr-1" style={{ color: soFitColor }}>
                  {props.post.likes.length}
                </span>
                <img
                  src={likeBtn}
                  className="mx-auto object-cover h-5 w-5 inline"
                  alt="like-btn"
                />
              </button>
            )}
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-2 border-b-2">
            {props.post.description}
          </p>
        </div>

        <div className="my-3">
          <span className="font-semibold">Exercises:</span>
          <ul className="text-gray-700 dark:text-gray-400">
            {props.post.workoutId.exercisesId.map((exercise, index) => {
              return (
                <li key={exercise._id} className="pl-4 text-sm mt-1">
                  <img
                    src={pickCategoryImage(exercise.category)}
                    alt="category-icon"
                    style={{ height: "19px", display: "inline" }}
                  />{" "}
                  {exercise.exerciseName}: {exercise.exerciseReps}{" "}
                  {getUnitByExerciseName(exercise.exerciseName)}
                </li>
              );
            })}
          </ul>
        </div>
        <p className="flex justify-between text-gray-700 dark:text-gray-400 text-right border-t-2 pt-2">
          <span className="font-semibold">{props.post.postedBy.name}</span>
          <span className="text-sm">
            {new Date(props.post.createdDate).toLocaleString().split(",")[0]}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ViewPostCard;
