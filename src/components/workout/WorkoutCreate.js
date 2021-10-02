import { useState } from "react";

import api from "../../apis/api";

import WorkoutForm from "./WorkoutForm";

function WorkoutCreate(props) {
  const [workoutState, setWorkoutState] = useState({
    name: "",
    description: "",
    weekDay: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setWorkoutState({
      ...workoutState,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    // Creating the workout in the backend
    api
      .post(`/workout`, workoutState)
      .then(() => {
        setLoading(false);

        // Cleaning all inputs of the form
        setWorkoutState({
          name: "",
          description: "",
          weekDay: "",
        });
        props.handleClose(false);
        props.setWorkoutCreated(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }
  return (
    <div>
      <WorkoutForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        workoutState={workoutState}
        statusAvailable={false}
        loading={loading}
        buttonText="Create workout"
      />
    </div>
  );
}

export default WorkoutCreate;
