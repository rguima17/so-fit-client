import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

import AllUsersCard from "./AllUsersCard";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { loggedInUser } = useContext(AuthContext);
  const history = useHistory();

  const soFitColor = "#6366F1";

  useEffect(() => {
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
      <div className="bg-gray-100 py-1 rounded mb-1 flex text-gray-500 items-center">
        <span className="whitespace-nowrap text-sm font-medium px-2">
          <i
            className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-3xl"
            onClick={() => history.goBack()}
          ></i>
        </span>

        <input
          className="w-full font-medium py-2 px-3 rounded-full text-left border-2"
          style={{ borderColor: soFitColor }}
          type="text"
          onChange={handleSearch}
          placeholder="Search for friends"
        />
      </div>

      <div className="relative w-full sm: ml-3 ">
        <div className="relative w-full px-4 pt-16 pb-16 mx-auto bg-top bg-cover max-w-6xl lg:py-24 lg:pb-32">
          <div className="grid gap-10 row-gap-8 ml-auto mr-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3  ">
            {filteredUsers.map((user) => {
              return (
                <div key={user._id}>
                  <AllUsersCard
                    id={user._id}
                    name={user.name}
                    pictureUrl={user.pictureUrl}
                    followers={user.followers}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
