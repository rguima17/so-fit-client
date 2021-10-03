import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../../apis/api";

import ExerciseForm from "./ExerciseForm";

function ExerciseEdit(props) {
  const [exerciseState, setExerciseState] = useState({
    category: "",
    exerciseName: "",
    exerciseReps: 0,
    workoutId: "",
  });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setExerciseState({ ...props.exerciseToUpdate });
  }, [props.exerciseToUpdate]);

  function handleChange(event) {
    setExerciseState({
      ...exerciseState,
      [event.target.name]: event.target.value,
      workoutId: id,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    // Updating the exercise in the backend
    api
      .patch(`/exercise/edit/${exerciseState._id}`, exerciseState)
      .then(() => {
        setLoading(false);

        // Cleaning all inputs of the form
        setExerciseState({
          category: "",
          exerciseName: "",
          exerciseReps: 0,
        });
        props.handleClose(false);
        props.setExerciseChanged(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <ExerciseForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      exerciseState={exerciseState}
      loading={loading}
      buttonText="Update exercise"
    />
  );
}

export default ExerciseEdit;
