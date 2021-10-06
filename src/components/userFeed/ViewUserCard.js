import { NavLink } from "react-router-dom";

function ViewUserCard(props) {
  return (
    <div>
      <div className="items-top mt-8  lg:flex">
        <div className=" lg:mt-0 lg:w-1/2 border-2 border-black">
          <div className="flex items-center justify-center lg:justify-end ">
            <div className="max-w-lg">
              <img
                className="object-cover object-top "
                src={props.pictureUrl}
                alt={`User ${props.name}`}
              />
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 border-2 border-black px-3">
          <div className="flex flex-row justify-between my-3">
            <h2 className="text-3xl font-bold ">{props.name}</h2>
            <button
              className="font-medium text-white bg-blue-600  px-3 rounded-full  border-2 border-blue-600 "
              onClick={props.handleFollow}
            >
              {props.buttonClick? "Unfollow" : "Follow"}
            </button>
          </div>
          <p className="lg:max-w-md">{props.description}</p>
          <div className="flex justify-around items-center mt-4">
            <div className="text-center">
              <h4 className="text-gray-600 text-sm">Followers</h4>
              <span className="mt-2 text-xl font-medium text-gray-800">
                {props.followersNumber}
              </span>
            </div>
            <div className="text-center">
              <h4 className="text-gray-600 text-sm">Following</h4>
              <span className="mt-2 text-xl font-medium text-gray-800">
                {props.followingNumber}
              </span>
            </div>
          </div>
          <div className="flex justify-around items-center mt-4">
            <div className="text-center">
              <h4 className="text-gray-600 text-sm">Level</h4>
              <span className="mt-2 text-xl font-medium text-gray-800">
                {props.level}
              </span>
            </div>
            <div className="text-center">
              <h4 className="text-gray-600 text-sm">So Fi Points</h4>
              <span className="text-xl font-medium text-gray-800">
                {props.soFitPoints}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-content-end mr-3">
        <NavLink
          to={`/user-feed`}
          className=" w-25 px-6 py-2  bg-blue-700 text-white"
        >
          Back
        </NavLink>
      </div>
    </div>
  );
}

export default ViewUserCard;
