function WorkoutForm(props) {
  return (
    <form
      className="p-4 shadow-md rounded-md text-left"
      style={{ maxWidth: "92vw", marginLeft: "auto", marginRight: "auto" }}
      onSubmit={props.handleSubmit}
    >
      <label className="block">
        <span className="text-gray-700">Workout given name</span>
        <input
          type="text"
          className="form-input mt-1 block w-full"
          placeholder="Intense core workout"
          maxLength="30"
          name="name"
          value={props.workoutState.name}
          onChange={props.handleChange}
          required
        />
      </label>
      <div className="mt-4">
        <label className="block">
          <span className="text-gray-700">Workout description</span>
          <textarea
            class="form-textarea mt-1 block w-full"
            rows="3"
            placeholder="You may enter a description"
            maxLength="500"
            name="description"
            value={props.workoutState.description}
            onChange={props.handleChange}
          ></textarea>

          {/* <input className="form-input mt-1 block w-full" placeholder="..." /> */}
        </label>
      </div>
      <div className="mt-4">
        <span className="text-gray-700">Status</span>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="status"
              value="Planned"
              onChange={props.handleChange}
              checked={props.workoutState.status === "Planned"}
            />
            <span className="ml-2">Planned</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="status"
              value="Done!"
              onChange={props.handleChange}
              checked={props.workoutState.status === "Done!"}
            />
            <span className="ml-2">Done!</span>
          </label>
        </div>
      </div>

      <label className="block mt-4">
        <span className="text-gray-700">Day of the week</span>
        <select
          className="form-select mt-1 block w-full"
          name="weekDay"
          value={props.workoutState.weekDay}
          onChange={props.handleChange}
        >
          <option value="MON">Monday</option>
          <option value="TUE">Tuesday</option>
          <option value="WED">Wednesday</option>
          <option value="THU">Thursday</option>
          <option value="FRI">Friday</option>
          <option value="SAT">Saturday</option>
          <option value="SUN">Sunday</option>
        </select>
      </label>
      <div className="mt-8">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          Send workout
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
