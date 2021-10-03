function getUnitByExerciseName(exerciseName) {
  switch (exerciseName) {
    case "Walking":
    case "Running":
    case "Biking":
      return "m";
    case "Frontal plank":
    case "Back plank":
    case "Side plank":
      return "seconds";
    default:
      return "reps";
  }
}

export default getUnitByExerciseName;
