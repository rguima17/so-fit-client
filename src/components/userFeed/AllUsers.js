import { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
import api from "../../apis/api";
import UserSmallCard from "./UserSmallcard";
import { NavLink } from "react-router-dom";

function AllUsers() {
  const [users, setUsers] = useState([]);

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

  return (
    <div>
        <div className = "flex justify-content-end mr-3"  >
      <NavLink
        to={`/profile`}
        className= " w-25 px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Back
      </NavLink>
      </div>
      <h3>All Users</h3>

      {users.map((user) => {
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
