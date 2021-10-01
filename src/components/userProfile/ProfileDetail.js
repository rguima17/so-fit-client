import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";
import { NavLink } from "react-router-dom";


function ProfileDetail() {
    const {  logout } = useContext(AuthContext);
    const[profile, setProfile] = useState({})

    useEffect(() => {

        async function fetchProfile() {
          try {
            
             const response = await api.get("/profile");
            //  console.log(response.data)
            
            setProfile({...response.data});
           
          } catch (err) {
            console.error(err);
        
          }
        }
        fetchProfile();
      }, []);


    return (
        <div>
            <h1>Profile Detail</h1>
            <img src ={profile.pictureUrl} alt = {`User ${profile.name}`}/>
            <div>Name: {profile.name}</div>
            <div>Description: {profile.description}</div>
            <div>Level: {profile.level}</div>
            <div>soFitPoints: {profile.soFitPoints}</div>
            <div>

              <NavLink
                  to={`/profile/edit/${profile._id}`}
                  className=""
                >
                  Edit
                </NavLink>

              </div>

            <div
                className=""
                onClick={logout}
                style={{ cursor: "pointer" }}
              >
                <h3>Logout</h3>
              </div>


        </div>
    )
}

export default ProfileDetail