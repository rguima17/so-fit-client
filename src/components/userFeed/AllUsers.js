import { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
import api from "../../apis/api";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import AllUsersCard from "./AllUsersCard";

function AllUsers() {
  const { loggedInUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

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
      <div className="text-center my-5 hover-cursor">
        <NavLink
          to={`/user-feed`}
          className="font-medium text-white bg-black py-2 px-3 rounded-full  border-2 border-blue-600 "
        >
          Back to your Feed
        </NavLink>
      </div>
      <div>
        <form className="text-center">
          <input
            className="font-medium  py-2 px-3 rounded-full text-center border-2 border-blue-600 "
            type="text"
            onChange={handleSearch}
            placeholder="Search your friends"
          />
        </form>
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
