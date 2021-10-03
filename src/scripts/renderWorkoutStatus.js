function renderWorkoutStatus(workoutObj) {
  if (workoutObj.status === "Done!") {
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {workoutObj.status}
      </span>
    );
  } else if (workoutObj.status === "Planned") {
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
        {workoutObj.status}
      </span>
    );
  }
  return null;
}

export default renderWorkoutStatus;
