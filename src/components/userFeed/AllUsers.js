import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import LoadingSpinner from "../structure/loading/LoadingSpinner";
import AllUsersCard from "./AllUsersCard";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const { loggedInUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await api.get("/users");
        setUsers([...response.data]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
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
      <div className="bg-gray-100 py-1 mb-1 flex text-gray-500 items-center">
        <span className="whitespace-nowrap text-sm font-medium px-2">
          <i
            className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-3xl"
            onClick={() => history.goBack()}
          ></i>
        </span>

        <input
          className="form-textarea w-full border-1 border-gray-400 mr-2"
          type="text"
          onChange={handleSearch}
          placeholder="Search for friends"
        />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-gray-300 dark:bg-gray-900 py-6 flex flex-col  sm:py-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 px-4">
            {filteredUsers.map((user) => {
              return (
                <div key={user._id}>
                  <AllUsersCard
                    id={user._id}
                    name={user.name}
                    pictureUrl={user.pictureUrl}
                    followers={user.followersId.length}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
