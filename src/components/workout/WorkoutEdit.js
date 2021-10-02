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
    async function fetchData() {
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
    fetchData();
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
    <div>
      <span className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <NavLink
          to={`/workout/${id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          {"<<"}
        </NavLink>
      </span>
      <h2>Edit your workout</h2>
      <WorkoutForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        workoutState={workoutState}
        loading={loading}
        buttonText="Update workout"
      />
    </div>
  );
}

export default WorkoutEdit;
