import { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

import api from "../../apis/api";

import LoadingSpinner from "../structure/loading/LoadingSpinner";

function WorkoutDone() {
  const { loggedInUser } = useContext(AuthContext);
  const [userPoints, setUserPoints] = useState(0);

  const history = useHistory();
  const { id, points } = useParams();

  // fetching the current value of the User's soFiPoints [action 1 out of 4]
  useEffect(() => {
    async function fetchUserPoints() {
      try {
        const storedUser = await api.get("/profile");
        if (userPoints === 0) {
          setUserPoints(Number(storedUser.data.soFitPoints) + Number(points));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserPoints();
  }, [userPoints, points]);

  // Updating the Workout db with the new status for that workout [action 2 out of 4]
  useEffect(() => {
    async function updateWorkoutStatus() {
      try {
        await api.patch(`/workout/edit/${id}`, { status: "Done!" });
      } catch (err) {
        console.error(err);
      }
    }
    updateWorkoutStatus();
  }, [id]);

  // updating the user's db with the new total of points [action 3 out of 4]
  useEffect(() => {
    async function updateUserPoints() {
      try {
        await api.patch(`/profile/edit/${loggedInUser.user._id}`, {
          soFitPoints: userPoints,
        });
        // Redirecting the the list of workouts [action 4 out of 4]
        history.push("/workout");
      } catch (err) {
        console.error(err);
      }
    }
    if (userPoints !== 0) {
      updateUserPoints();
    }
  }, [history, loggedInUser, userPoints]);

  return (
    <div>
      Updating points...
      <br />
      <LoadingSpinner />
    </div>
  );
}

export default WorkoutDone;
