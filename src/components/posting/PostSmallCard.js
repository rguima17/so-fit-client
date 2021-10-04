import { NavLink } from "react-router-dom";

function PostSmallCard(props) {
  return (
    <div className="shadow-lg mx-3 mt-2 rounded-2xl bg-white dark:bg-gray-800 p-4 max-w-md">
      <div className="flex-row  flex justify-between items-center ">
        <div className="flex-shrink-0">
          <div className="block relative">
            <img
              alt="pictureUrl"
              src={props.pictureUrl}
              className="mx-auto object-cover rounded-full h-16 w-16 "
            />
          </div>
        </div>
        <div className=" flex flex-col">
          <span className="text-gray-600 dark:text-white text-lg font-medium">
            {props.name}
          </span>
          <span className="text-gray-400 text-xs"></span>
        </div>
        <NavLink
          to={`/post/${props.id}`}
          className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          View Workout
        </NavLink>
      </div>
    </div>
  );
}

export default PostSmallCard;
