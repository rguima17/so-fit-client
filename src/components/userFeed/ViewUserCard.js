import { NavLink } from "react-router-dom";


function ViewUserCard(props) {
    return (
        <div>
      <div className="max-w-sm mt-4 mx-auto overflow-hidden bg-white  rounded-lg shadow-lg dark:bg-gray-800">
        <img
          className="object-fill  object-top w-full h-56 "
          src={props.pictureUrl}
          alt={`User ${props.name}`}
        />
        <div className="text-center  py-3  bg-gray-900">
          <h1 className="mx-3 mb-0 text-xl font-bold text-white">
            Welcome to User profile !
          </h1>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between mb-1">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {props.name}
            </h1>
           
          </div>
          <p className="py-2  font-semibold text-lg text-gray-700 dark:text-gray-400">
            About: {props.description}
          </p>

          <div className="flex items-center mt-4 ">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              Level: {props.level}
            </p>
          </div>
          <div className="flex items-center mt-4 ">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              Followers: {props.followersNumber}
            </p>
          </div>
          <div className="flex items-center mt-4 ">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              Following: {props.followingNumber}
            </p>
          </div>

          <div className="flex items-center mt-4">
            <p className=" font-semibold text-lg text-gray-700 dark:text-gray-400">
              {" "}
              SoFit Points: {props.soFitPoints}
            </p>
          </div>
        </div>
        <div className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
             onClick={props.handleFollow}>
              Follow
            </div>
            <div className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={props.handleUnfollow}
            >
              Unfollow
            </div>
      </div>
    </div>
    )
     
    
  }
  
  export default ViewUserCard;
  