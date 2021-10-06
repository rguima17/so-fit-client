import { NavLink } from "react-router-dom";

import likeBtn from "../../assets/icons/likeBtn.png";

function ViewPostCard(props) {
  const soFitColor = "#6366F1";

  return (
    <div className="max-w-sm mt-2 mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <img
        className="object-fill object-top w-full h-56 "
        src={props.post.pictureUrl}
        alt={`User ${props.post.name}`}
      />
      <div className="px-4 py-4">
        <div className="sm:px-6 text-center">
          <div className="text-lg leading-6 font-medium text-gray-900 text-center">
            <span className="whitespace-nowrap text-sm font-medium">
              <NavLink
                to={`/user-feed`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <i className="fas fa-arrow-circle-left text-lg"></i>
              </NavLink>
            </span>
            <span className="pl-3 pr-3"> {props.post.name}</span>
            <i
              className="fas fa-times text-red-400"
              onClick={props.deletePost}
            ></i>
            <button
              className="inline bg-indigo-100 rounded-md p-1 animate-pulse"
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
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 pb-2 border-b-2">
            {props.post.description}
          </p>
        </div>

        <div className="flex items-center mt-3 ">
          <p className="text-gray-700 dark:text-gray-400">
            <span className="font-semibold">Exercises:</span>
            {props.exercises.map((exercise, index) => {
              return <li key={exercise + index}>{exercise}</li>;
            })}
          </p>
        </div>
        <p className="text-gray-700 dark:text-gray-400 text-right">
          <span className="font-semibold">Posted by:</span>{" "}
          {props.post.postedBy.name} (
          {new Date(props.post.createdDate).toLocaleString().split(",")[0]})
        </p>
      </div>
    </div>
  );
}

export default ViewPostCard;
