import { useState, useEffect } from "react";
// import { useHistory, useParams } from "react-router-dom";
import api from "../../apis/api";
import UserSmallCard from "./UserSmallcard";

function AllUsers() {

    const [users, setUsers] = useState([
    
    ]);

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
  
    return(
        <div> 
            <h2>All Users</h2>
           
           {users.map((user) => {
            return (
              <div  key = {user._id}>
              <UserSmallCard
                id = {user._id}
                name={user.name}
                pictureUrl={user.pictureUrl}
                followers={user.followers}
          
              />
           </div>
            );
          })}

        </div>
    )
}


export default AllUsers
