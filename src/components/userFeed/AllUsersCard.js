import { NavLink } from "react-router-dom";

function AllUsersCard(props) {
  return (
    <NavLink to={`/user/${props.id}`}>
      <div className="shadow-lg bg-gray-200 rounded-xl flex">
        <img
          className="w-14 h-14 object-cover rounded-2xl border-2 ml-1 mr-2"
          src={props.pictureUrl}
          alt={props.name}
        />
        <div className="flex justify-between">
          <div className="flex-col justify-center border-l border-indigo-600 pl-2">
            <p className="text-gray-900 dark:text-gray-300 font-semibold">
              {props.name}
            </p>
            <p className="text-black dark:text-gray-100 text-justify">
              Followers:
              <span className="text-indigo-600 mx-2">
                {props.followers}
                <i className="fas fa-running ml-1"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default AllUsersCard;
