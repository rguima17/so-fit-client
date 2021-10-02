import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";

import LoadingSpinner from "../structure/loading/LoadingSpinner";
import WorkoutCreate from "./WorkoutCreate";

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [workoutCreated, setWorkoutCreated] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await api.get("/workout");
        setWorkouts([...response.data]);
        setLoading(false);
        if (workoutCreated) {
          setWorkoutCreated(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchProjects();
  }, [workoutCreated]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                      {/* <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workouts.map((workoutObj) => {
                      return (
                        <tr
                          className="hover:bg-gray-100"
                          key={workoutObj._id}
                          onClick={() => {
                            history.push(`/workout/${workoutObj._id}`);
                          }}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 ">
                              {workoutObj.name}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-center">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 ">
                              {workoutObj.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 text-center">
                              {workoutObj.exercisesId.length}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Add a new workout
            </button>

            {showForm ? (
              <WorkoutCreate
                handleClose={setShowForm}
                setWorkoutCreated={setWorkoutCreated}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
