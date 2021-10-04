import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../apis/api";
import ProfileForm from "./ProfileForm";

function ProfileEdit() {
  const [profile, setProfile] = useState({
    name: "",
    description: "",
    pictureUrl: "" 
  });

  const [error, setError] = useState("");

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    
    async function fetchProfile() {
      try {
        const response = await api.get("/profile");

        console.log(id);

        setProfile({ ...response.data });
      } catch (err) {
        console.error(err);
        if (!err.response.data) {
          return setError("Erro desconhecido");
        }
        if (err.response.data.err) {
          return setError(err.response.data.err.message);
        }
        return setError(err.response.data.msg);
      }
    }
    fetchProfile();
  }, [id]);

  async function handleUpload(file) {
    const uploadData = new FormData();

    uploadData.append("pictureUrl2", file);

    const response = await api.post("/image-upload", uploadData);

    return response.data.url;
  }

  function handleChange(event) {
    if (event.target.files) {
      // console.log("entrou");

      return setProfile({
        ...profile,
        [event.target.name]: event.target.files[0],
      });
    }
    return setProfile({ ...profile, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (profile.pictureUrl2) {
        const pictureUrl = await handleUpload(profile.pictureUrl2);

        await api.patch(`/profile/edit/${id}`, { ...profile, pictureUrl });
        history.push("/profile");
      } else {
        await api.patch(`/profile/edit/${id}`, profile);
        history.push("/profile");
      }
    } catch (err) {
      console.error(err);
      if (!err.response.data) {
        return setError("Erro desconhecido");
      }
      if (err.response.data.err) {
        return setError(err.response.data.err.message);
      }
      return setError(err.response.data.msg);
    }
  }

  return (
    <div>
      <ProfileForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleUpload={handleUpload}
        profile={profile}
        error={error}
      />
    </div>
  );
}

export default ProfileEdit;
