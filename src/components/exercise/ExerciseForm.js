import LoadingSpinner from "../structure/loading/LoadingSpinner";

import getUnitByExerciseName from "../../scripts/getUnitByExerciseName";

function ExerciseForm(props) {
  const renderExerciseNamesByCategory = () => {
    switch (props.exerciseState.category) {
      case "Cardio":
        return (
          <label className="block mt-2">
            <span className="text-gray-700">Exercise name</span>
            <select
              className="form-select mt-1 block w-full"
              name="exerciseName"
              value={props.exerciseState.exerciseName}
              onChange={props.handleChange}
              required
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              <option value="Walking">Walking</option>
              <option value="Running">Running</option>
            </select>
          </label>
        );
      case "Bike":
        return (
          <label className="block mt-2">
            <span className="text-gray-700">Exercise name</span>
            <select
              className="form-select mt-1 block w-full"
              name="exerciseName"
              value={props.exerciseState.exerciseName}
              onChange={props.handleChange}
              required
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              <option value="Biking">Biking</option>
            </select>
          </label>
        );
      case "Body-workout":
        return (
          <label className="block mt-2">
            <span className="text-gray-700">Exercise name</span>
            <select
              className="form-select mt-1 block w-full"
              name="exerciseName"
              value={props.exerciseState.exerciseName}
              onChange={props.handleChange}
              required
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              <option value="Push-up">Push-up</option>
              <option value="Pull-up">Pull-up</option>
              <option value="Chin-up">Chin-up</option>
              <option value="Abs">Abs</option>
              <option value="Lunges">Lunges</option>
              <option value="Jumping jack">Jumping jack</option>
              <option value="Squat">Squat</option>
              <option value="Single under">Single under</option>
              <option value="Frontal plank">Frontal plank</option>
              <option value="Back plank">Back plank</option>
              <option value="Side plank">Side plank</option>
            </select>
          </label>
        );
      default:
        return <div className="mt-1 mb-10 block w-full"></div>;
    }
  };

  const renderQuantityInputByExerciseName = () => {
    return (
      <label className="block mt-2">
        <span className="text-gray-700 block">Quantity</span>
        <input
          type="number"
          className="form-input mt-1 inline w-2/3"
          min="0"
          max="100000"
          step="0.1"
          name="exerciseReps"
          value={props.exerciseState.exerciseReps}
          onChange={props.handleChange}
          required
        />
        <span> {getUnitByExerciseName(props.exerciseState.exerciseName)}</span>
      </label>
    );
  };

  return props.loading ? (
    <LoadingSpinner />
  ) : (
    <form
      className="p-4 shadow-md rounded-md text-left mx-auto"
      style={{ maxWidth: "94vw" }}
      onSubmit={props.handleSubmit}
    >
      <label className="block mt-2">
        <span className="text-gray-700">Exercise category</span>
        <select
          className="form-select mt-1 block w-full"
          name="category"
          value={props.exerciseState.category}
          onChange={props.handleChange}
          required
        >
          <option value="" disabled hidden>
            Choose here
          </option>
          <option value="Cardio">Cardio</option>
          <option value="Bike">Bike</option>
          <option value="Body-workout">Body workout</option>
        </select>
      </label>

      {renderExerciseNamesByCategory()}

      {props.exerciseState.exerciseName !== ""
        ? renderQuantityInputByExerciseName()
        : null}

      <div className="mt-3">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-indigo-600">
          {props.buttonText}
        </button>
      </div>
    </form>
  );
}

export default ExerciseForm;
