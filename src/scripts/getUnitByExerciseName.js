function getUnitByExerciseName(exerciseName) {
  switch (exerciseName) {
    case "Walking":
    case "Running":
    case "Biking":
    case "Cross country":
    case "Mountain bike":
      return "m";
    case "Frontal plank":
    case "Back plank":
    case "Side plank":
    case "Skipping":
      return "seconds";
    case "Zumba":
    case "Yoga":
    case "Spinning":
    case "Jumping":
    case "Basketball":
    case "Football":
    case "Tennis":
    case "Handball":
    case "Volleyball":
      return "minutes";
    default:
      return "reps";
  }
}

export default getUnitByExerciseName;
