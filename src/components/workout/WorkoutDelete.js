import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../apis/api";
import LoadingSpinner from "../structure/loading/LoadingSpinner";

function WorkoutDelete() {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function deleteData() {
      try {
        await api.delete(`/workout/delete/${id}`);

        history.push("/workout");
      } catch (err) {
        console.error(err);
      }
    }
    deleteData();
  }, [id, history]);

  return (
    <div className="text-center">
      Deleting...
      <br />
      <LoadingSpinner />
    </div>
  );
}

export default WorkoutDelete;
