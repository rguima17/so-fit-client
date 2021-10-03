import { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";

import api from "../../apis/api";
import ExerciseCreate from "../exercise/ExerciseCreate";
import ExerciseEdit from "../exercise/ExerciseEdit";

import LoadingSpinner from "../structure/loading/LoadingSpinner";
import ConirmationModal from "../structure/confirmationModal/ConfirmationModal";

import pickCategoryImage from "../../scripts/pickExerciseCategory";
import renderWorkoutStatus from "../../scripts/renderWorkoutStatus";

function WorkoutDetail() {
  const [workout, setWorkoutDetails] = useState({
    name: "",
    description: "",
    status: "",
    weekDay: "",
    exercisesId: [],
  });

  const { id } = useParams();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [exerciseChanged, setExerciseChanged] = useState(false);
  const [exerciseToUpdate, setExerciseToUpdate] = useState({
    category: "",
    exerciseName: "",
    exerciseReps: 0,
  });

  // Setup for deleting a generic entity (exercise, or workout)
  const [showModal, setShowModal] = useState(false);
  const [targetObj, setTargetObj] = useState({});
  const [modalTexts, setModalTexts] = useState({ title: "", description: "" });

  function handleDeleteClick(targetObj) {
    setTargetObj(targetObj);
    // first case, deleting an exercise
    if (targetObj.exerciseName) {
      setModalTexts({
        title: "exercise",
        description: `${targetObj.exerciseReps} x ${targetObj.exerciseName}`,
      });
      // second case, deleting an workout
    } else {
      setModalTexts({
        title: "workout",
        description: `${targetObj.name}`,
      });
    }
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
  }

  async function handleModalDeletion() {
    try {
      // first case, deleting an exercise
      if (targetObj.exerciseName) {
        await api.delete(`/exercise/delete/${targetObj._id}`);
        // second case, deleting an workout
      } else {
        history.push(`/workout/delete/${id}`);
      }
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
    <div className="px-1 pt-1">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
          <div className="px-4 py-3 sm:px-6 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
              <span className="py-4 whitespace-nowrap text-right text-sm font-medium">
                <NavLink
                  to={`/workout`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  {"<<"}
                </NavLink>
              </span>
              <span className="pl-3 pr-2">{workout.name}</span>
              <span className="pr-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NavLink
                  to={`/workout/edit/${id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-6 inline"
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
                </NavLink>
              </span>
              <i
                className="fas fa-times text-red-400"
                onClick={() => handleDeleteClick(workout)}
              ></i>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {workout.description}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                {renderWorkoutStatus(workout)}
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
                  {workout.exercisesId
                    .reduce((acc, exercise) => {
                      return acc + exercise.exerciseTotalPoints;
                    }, 0)
                    .toFixed(3)}
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
                        <img
                          src={pickCategoryImage(exercise.category)}
                          alt="category-icon"
                          style={{ height: "19px", display: "inline" }}
                        />{" "}
                        {exercise.exerciseReps} x {exercise.exerciseName}
                      </span>
                      <div>
                        <span className="px-2 whitespace-nowrap text-right text-sm font-medium">
                          <span
                            onClick={() => {
                              setShowForm(!showForm);
                              setExerciseToUpdate({ ...exercise });
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
                          onClick={() => handleDeleteClick(exercise)}
                        ></i>
                      </div>
                    </dd>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setExerciseToUpdate({
                    category: "",
                    exerciseName: "",
                    exerciseReps: 0,
                  });
                }}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Add a new exercise to this workout
              </button>
              {showForm ? (
                exerciseToUpdate._id ? (
                  <ExerciseEdit
                    exerciseToUpdate={exerciseToUpdate}
                    handleClose={setShowForm}
                    setExerciseChanged={setExerciseChanged}
                  />
                ) : (
                  <ExerciseCreate
                    handleClose={setShowForm}
                    setExerciseChanged={setExerciseChanged}
                  />
                )
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
        targetObj={targetObj}
        modalTexts={modalTexts}
      />
    </div>
  );
}

export default WorkoutDetail;
