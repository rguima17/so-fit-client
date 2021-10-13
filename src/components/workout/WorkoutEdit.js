import { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";

import api from "../../apis/api";

import WorkoutForm from "./WorkoutForm";

function WorkoutEdit() {
  const [workoutState, setWorkoutState] = useState({
    name: "",
    description: "",
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
    <div className="px-1 pt-1 lg:max-w-3xl mx-auto  lg:mt-2">
      <div className="bg-gray-100 py-1 rounded-md mb-1 flex items-center text-gray-500 justify-center pl-10">
        <span className="pr-6 whitespace-nowrap inline">
          <NavLink
            to={`/workout/${id}`}
            className="text-indigo-600 hover:text-indigo-900 "
          >
            <i className="fas fa-arrow-circle-left text-2xl"></i>
          </NavLink>
        </span>
        <h5 className="inline">Edit your workout</h5>
      </div>
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
