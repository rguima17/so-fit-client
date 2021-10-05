function WorkoutListTable(props) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
          >
            Workout name
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
          >
            Exercises
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {props.workouts.map((workoutObj) => {
          if (workoutObj.status === props.targetStatus) {
            return (
              <tr
                className="hover:bg-gray-100"
                key={workoutObj._id}
                onClick={() => {
                  props.history.push(`/workout/${workoutObj._id}`);
                }}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{workoutObj.name}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {props.renderWorkoutStatus(workoutObj)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 text-center">
                    {workoutObj.exercisesId.length}
                  </div>
                </td>
              </tr>
            );
          } else {
            return null;
          }
        })}
      </tbody>
    </table>
  );
}

export default WorkoutListTable;
