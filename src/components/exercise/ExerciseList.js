import pickCategoryImage from "../../scripts/pickExerciseCategory";
import getUnitByExerciseName from "../../scripts/getUnitByExerciseName";

// This component is used in the WorkoutDetail
function ExerciseList(props) {
  return (
    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dd className="text-sm font-medium text-gray-500">Exercise's list</dd>
      {props.workout.exercisesId.map((exercise) => {
        return (
          <dd
            className="flex justify-between mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            key={exercise._id}
          >
            <span>
              <img
                src={pickCategoryImage(exercise.category)}
                alt="category-icon"
                style={{ height: "19px", display: "inline" }}
              />{" "}
              {exercise.exerciseName}:{" "}
              {exercise.exerciseReps.toLocaleString("pt-BR")}{" "}
              {getUnitByExerciseName(exercise.exerciseName)}
            </span>
            {props.workout.status !== "Done!" ? (
              <div>
                <span className="px-2 whitespace-nowrap text-right text-sm font-medium">
                  <span
                    onClick={() => {
                      props.setShowForm(!props.showForm);
                      props.setExerciseToUpdate({ ...exercise });
                      props.scrollRef.current.scrollIntoView();
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline"
                      fill="none"
                      viewBox="0 0 24 28"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </span>
                </span>
                <i
                  className="fas fa-times text-red-400"
                  onClick={() => props.handleDeleteClick(exercise)}
                ></i>
              </div>
            ) : null}
          </dd>
        );
      })}
    </div>
  );
}

export default ExerciseList;
