import LoadingSpinner from "../structure/loading/LoadingSpinner";

function ExerciseForm(props) {
  const renderExerciseNamesByCategory = () => {
    switch (props.exerciseState.category) {
      case "Cardio":
        return (
          <select
            className="form-select mt-1 block w-full"
            name="exerciseName"
            value={props.exerciseState.exerciseName}
            onChange={props.handleChange}
          >
            <option value="" disabled hidden>
              Choose here
            </option>
            <option value="Walking">Walking</option>
            <option value="Running">Running</option>
          </select>
        );
      case "Bike":
        return (
          <select
            className="form-select mt-1 block w-full"
            name="exerciseName"
            value={props.exerciseState.exerciseName}
            onChange={props.handleChange}
          >
            <option value="" disabled hidden>
              Choose here
            </option>
            <option value="Biking">Biking</option>
          </select>
        );
      case "Body-workout":
        return (
          <select
            className="form-select mt-1 block w-full"
            name="exerciseName"
            value={props.exerciseState.exerciseName}
            onChange={props.handleChange}
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
        );
      default:
        return <div className="mt-1 mb-10 block w-full"></div>;
    }
  };

  return props.loading ? (
    <LoadingSpinner />
  ) : (
    <form
      className="p-4 shadow-md rounded-md text-left"
      style={{ maxWidth: "92vw", marginLeft: "auto", marginRight: "auto" }}
      onSubmit={props.handleSubmit}
    >
      <label className="block mt-4">
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
      <label className="block mt-4">
        <span className="text-gray-700">Exercise name</span>
        {renderExerciseNamesByCategory()}
      </label>
      <label className="block">
        <span className="text-gray-700">Number of reps</span>
        <input
          type="number"
          className="form-input mt-1 block w-full"
          min="0"
          max="100000"
          step="0.1"
          name="exerciseReps"
          value={props.exerciseState.exerciseReps}
          onChange={props.handleChange}
          required
        />
      </label>
      <div className="mt-8">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          {props.buttonText}
        </button>
      </div>
    </form>
  );
}

export default ExerciseForm;
