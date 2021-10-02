import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";

import api from "../../apis/api";
import ExerciseCreate from "../exercise/ExerciseCreate";

import LoadingSpinner from "../structure/loading/LoadingSpinner";
import ConirmationModal from "../structure/confirmationModal/ConfirmationModal";

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

  const [showForm, setShowForm] = useState(false);
  const [exerciseChanged, setExerciseChanged] = useState(false);

  // Setup for deleting an exercise
  const [showModal, setShowModal] = useState(false);
  const [clickedExercise, setClickedExercise] = useState({});

  function handleDeleteClick(exerciseObj) {
    setClickedExercise(exerciseObj);
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  async function handleModalDeletion() {
    try {
      await api.delete(`/exercise/delete/${clickedExercise._id}`);
      setExerciseChanged(true);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  }

  // Retreiving the workout details
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(`/workout/${id}`);

        setWorkoutDetails({ ...response.data });
        setLoading(false);

        if (exerciseChanged) {
          setExerciseChanged(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id, exerciseChanged]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-3 sm:px-6 text-center">
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
                <dd className="text-sm font-medium text-gray-500">
                  Exercise's list
                </dd>
                {workout.exercisesId.map((exercise) => {
                  return (
                    <dd
                      className="flex justify-between mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                      key={exercise._id}
                    >
                      <span>
                        - {exercise.exerciseReps} x {exercise.exerciseName}
                      </span>
                      <div>
                        <i className="fas fa-pencil-alt text-green-600 px-2"></i>
                        <i
                          className="fas fa-times text-red-400"
                          onClick={() => handleDeleteClick(exercise)}
                        ></i>
                      </div>
                    </dd>
                  );
                })}
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Add a new exercise to this workout
              </button>
              {showForm ? (
                <ExerciseCreate
                  handleClose={setShowForm}
                  setExerciseChanged={setExerciseChanged}
                />
              ) : null}
            </dl>
          </div>
        </div>
      )}
      <ConirmationModal
        show={showModal}
        handleModalClose={handleModalClose}
        handleModalDeletion={handleModalDeletion}
        setExerciseChanged={setExerciseChanged}
        clickedExercise={clickedExercise}
      />
    </div>
  );
}

export default WorkoutDetail;
