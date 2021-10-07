import LoadingSpinner from "../structure/loading/LoadingSpinner";

function WorkoutForm(props) {
  return props.loading ? (
    <LoadingSpinner />
  ) : (
    <form
      className="bg-white p-4 shadow-md rounded-md text-left border-gray-200 mx-auto"
      style={{ maxWidth: "92vw" }}
      onSubmit={props.handleSubmit}
    >
      <label className="block">
        <span className="text-gray-700 font-medium">Workout given name</span>
        <input
          type="text"
          className="form-input mt-1 block w-full"
          placeholder="Intense core workout"
          maxLength="15"
          name="name"
          value={props.workoutState.name}
          onChange={props.handleChange}
          required
        />
      </label>
      <div className="mt-2">
        <label className="block">
          <span className="text-gray-700 font-medium">Workout description</span>
          <textarea
            className="form-textarea mt-1 block w-full"
            rows="3"
            placeholder="You may enter a description"
            maxLength="300"
            name="description"
            value={props.workoutState.description}
            onChange={props.handleChange}
          ></textarea>
        </label>
      </div>
      <label className="block mt-2">
        <span className="text-gray-700 font-medium">Day of the week</span>
        <select
          className="form-select mt-1 block w-full"
          name="weekDay"
          value={props.workoutState.weekDay}
          onChange={props.handleChange}
          required
        >
          <option value="" disabled hidden>
            Choose here
          </option>
          <option value="MON">Monday</option>
          <option value="TUE">Tuesday</option>
          <option value="WED">Wednesday</option>
          <option value="THU">Thursday</option>
          <option value="FRI">Friday</option>
          <option value="SAT">Saturday</option>
          <option value="SUN">Sunday</option>
        </select>
      </label>
      <div className="mt-3">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600">
          {props.buttonText}
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
