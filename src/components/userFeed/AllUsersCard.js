import { NavLink } from "react-router-dom";

function AllUsersCard(props) {
  return (
    <div className="flex items-center">
      <img
        alt="pictureUrl"
        src={props.pictureUrl}
        className="object-cover w-20 h-20 mr-4 rounded-full"
      />
      <div className="relative">
        <div className="text-lg font-medium text-gray-800 mb-1 text-xl">{props.name}</div>
        <NavLink
          to={`/user/${props.id}`}
          className="bg-blue-600 text-center hover:bg-blue-900 text-white font-medium py-1 px-3  rounded-full"
        >
          View Profile
        </NavLink>
      </div>
    </div>
  );
}

export default AllUsersCard;
