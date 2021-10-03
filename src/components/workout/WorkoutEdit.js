import { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";

import api from "../../apis/api";

import WorkoutForm from "./WorkoutForm";

function WorkoutEdit() {
  const [workoutState, setWorkoutState] = useState({
    name: "",
    description: "",
    status: "",
    weekDay: "",
    exercisesId: [],
  });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  // Fetching the current workout data an storing it in the state
  useEffect(() => {
    async function fetchWorkoutEditData() {
      setLoading(true);
      try {
        const response = await api.get(`/workout/${id}`);

        setWorkoutState({ ...response.data });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchWorkoutEditData();
  }, [id]);

  function handleChange(event) {
    setWorkoutState({
      ...workoutState,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    // Updating the backend
    api
      .patch(`/workout/edit/${id}`, workoutState)
      .then(() => {
        setLoading(false);
        history.push(`/workout/${id}`);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }
  return (
    <div className="bg-white px-1 pt-1">
      <div className="inline flex justify-center items-center pr-4">
        <span className="pr-2 py-4 whitespace-nowrap text-sm font-medium inline">
          <NavLink
            to={`/workout/${id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            {"<<"}
          </NavLink>
        </span>
        <h4 className="inline">Edit your workout</h4>
      </div>
      <WorkoutForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        workoutState={workoutState}
        statusAvailable={true}
        loading={loading}
        buttonText="Update workout"
      />
    </div>
  );
}

export default WorkoutEdit;
