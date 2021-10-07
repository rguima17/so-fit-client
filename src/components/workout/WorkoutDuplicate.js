import { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";

import api from "../../apis/api";

import WorkoutForm from "./WorkoutForm";

function WorkoutDuplicate() {
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

  // Fetching the current workout data and storing it in the state
  useEffect(() => {
    async function fetchWorkoutEditData() {
      setLoading(true);
      try {
        const response = await api.get(`/workout/filtered-for-dup/${id}`);

        if (workoutState.name === "") {
          setWorkoutState({
            ...response.data,
            status: "Planned",
            name: response.data.name + " copy",
          });
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchWorkoutEditData();
  }, [id, workoutState]);

  function handleChange(event) {
    setWorkoutState({
      ...workoutState,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      // Creating a new workout in the database as a copy of the first one
      const { name, description, weekDay, status } = workoutState;
      const workoutDuplicated = await api.post(`/workout`, {
        name: name,
        description: description,
        weekDay: weekDay,
        status: status,
      });

      // Duplicating the exercises as well (as a new exercise in the database)
      const cloneArr = [...workoutState.exercisesId];
      for (let i = 0; i < cloneArr.length; i++) {
        try {
          const exercise = await api.get(`exercise/${cloneArr[i]}`);
          const { category, exerciseName, exerciseReps } = exercise.data;

          await api.post("exercise", {
            category: category,
            exerciseName: exerciseName,
            exerciseReps: exerciseReps,
            workoutId: workoutDuplicated.data._id,
          });
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      }

      // redirecting
      setLoading(false);
      history.push(`/workout`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }
  return (
    <div className="bg-white px-1 pt-1 mx-2 mt-2 rounded-lg">
      <div className="flex justify-center items-center pr-4">
        <span className="pr-2 py-4 whitespace-nowrap text-sm font-medium inline">
          <NavLink
            to={`/workout/${id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <i className="fas fa-arrow-circle-left text-2xl"></i>
          </NavLink>
        </span>
        <h5 className="inline text-lg">Duplicate your workout</h5>
      </div>
      <WorkoutForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        workoutState={workoutState}
        loading={loading}
        buttonText="Duplicate workout"
      />
    </div>
  );
}

export default WorkoutDuplicate;
