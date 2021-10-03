import { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
import api from "../../apis/api";
import UserSmallCard from "./UserSmallcard";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function AllUsers() {
  const { loggedInUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("useeffect1");
    async function fetchUsers() {
      try {
        const response = await api.get("/users");
        setUsers([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const usersWithoutLoggedInUser = users.filter(
    (user) => user._id !== loggedInUser.user._id
  );

  const filteredUsers = usersWithoutLoggedInUser.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-content-end mr-3">
        <NavLink
          to={`/profile`}
          className=" w-25 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Back
        </NavLink>
      </div>
      <h3>All Users</h3>

      <div>
        <form className="">
          <input
            className=" text-gray-700 bg-white border border-gray-300 rounded-md sm:mx-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            type="text"
            onChange={handleSearch}
            placeholder="Search User"
          />
        </form>
      </div>

      {filteredUsers.map((user) => {
        return (
          <div key={user._id}>
            <UserSmallCard
              id={user._id}
              name={user.name}
              pictureUrl={user.pictureUrl}
              followers={user.followers}
            />
          </div>
        );
      })}
    </div>
  );
}

export default AllUsers;
