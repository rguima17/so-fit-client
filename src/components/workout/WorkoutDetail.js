import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

import api from "../../apis/api";

import LoadingSpinner from "../structure/loading/LoadingSpinner";

// tailwind component
// import { PaperClipIcon } from "@heroicons/react/solid";

function WorkoutDetail() {
  const [workout, setWorkoutDetails] = useState({
    name: "",
    description: "",
    status: "",
    weekDay: "",
    exercisesId: [],
  });

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(`/workout/${id}`);

        setWorkoutDetails({ ...response.data });
        setLoading(false);

        // if (taskCreated) {
        //   setTaskCreated(false);
        // }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <h1>workout details</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              <span className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NavLink
                  to={`/workout`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  {"<<"}
                </NavLink>
              </span>
              {workout.name}
              <span className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NavLink
                  to={`/workout/edit/${id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </NavLink>
              </span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {workout.description}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {workout.status}
                </span>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Day of the week
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {workout.weekDay}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Amount of points to be earned
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {workout.exercisesId.reduce((acc, exercise) => {
                    return acc + exercise.exerciseTotalPoints;
                  }, 0)}
                </dd>
              </div>
              <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Exercise's list
                </dt>
                {workout.exercisesId.map((exercise) => {
                  return (
                    <dd
                      className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      key={exercise._id}
                    >
                      - {exercise.exerciseReps} x {exercise.exerciseName}
                    </dd>
                  );
                })}
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutDetail;
