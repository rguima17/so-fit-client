import { NavLink } from "react-router-dom";

function AllUsersCard(props) {
  const soFitColor = "#6366F1";
  return (
    <NavLink to={`/user/${props.id}`}>
      <div className="bg-gray-100 border-indigo-600  | mx-5 border-solid rounded-3xl border-2 | flex justify-start ">
        <img
          className="w-14 h-14 object-cover rounded-3xl border-2 ml-1 mr-12"
          src={props.pictureUrl}
          alt={props.name}
        />
        <div className="flex flex-col justify-center">
          <p className="text-gray-900 dark:text-gray-300 font-semibold">
            {props.name}
          </p>
          <p className="text-black dark:text-gray-100 text-justify font-semibold">
            Followers: {props.followers}
            <i
              className="fas fa-running text-purple-500 ml-1"
              style={{ color: soFitColor }}
            ></i>
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default AllUsersCard;
