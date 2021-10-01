import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../apis/api";
import ProfileForm from "./ProfileForm";
import { NavLink } from "react-router-dom";

function ProfileEdit() {
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    pictureUrl: "",
  });


//   const [error, setError] = useState("");

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/profile");
        //  console.log(response.data)
        console.log(id);

        setProfile({ ...response.data });
      } catch (err) {
        console.error(err);
        // if (!err.response.data) {
        //     return setError("Erro desconhecido");
        //   }
        //   if (err.response.data.err) {
        //     return setError(err.response.data.err.message);
        //   }
        //   return setError(err.response.data.msg);
      }
    }
    fetchProfile();
  }, [id]);


  function handleChange(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    //localhost:1234/api/profile/edit/6156282b1fb5ae1620e6bfbb

    try {
      await api.patch(`/profile/edit/${id}`, profile);
      history.push("/profile");
    } catch (err) {
      console.error(err);
    //   if (!err.response.data) {
    //     return setError("Erro desconhecido");
    //   }
    //   if (err.response.data.err) {
    //     return setError(err.response.data.err.message);
    //   }
    //   return setError(err.response.data.msg);

    }
  }

  return (
    <div>
      <h1>Edit your Profile</h1>

      <ProfileForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        profile={profile}
      />

      <div>
        <NavLink to={`/profile`} className="">
          Back
        </NavLink>
      </div>

    </div>
  );
}

export default ProfileEdit;
