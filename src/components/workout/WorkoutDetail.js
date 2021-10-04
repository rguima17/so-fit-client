import { useState, useEffect, useRef } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";

import api from "../../apis/api";
import ExerciseCreate from "../exercise/ExerciseCreate";
import ExerciseList from "../exercise/ExerciseList";
import ExerciseEdit from "../exercise/ExerciseEdit";

import LoadingSpinner from "../structure/loading/LoadingSpinner";
import ConirmationModal from "../structure/confirmationModal/ConfirmationModal";

import renderWorkoutStatus from "../../scripts/renderWorkoutStatus";

function WorkoutDetail() {
  const [workout, setWorkoutDetails] = useState({
    name: "",
    description: "",
    status: "",
    weekDay: "",
    exercisesId: [],
  });
  const [workoutTotalPoints, setWorkoutTotalPoints] = useState(0);

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

  const scrollRef = useRef(null);

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
    async function fetchWorkoutData() {
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
    fetchWorkoutData();
  }, [id, exerciseChanged]);

  // Calculating this workout total points
  useEffect(() => {
    setWorkoutTotalPoints(
      workout.exercisesId.reduce((acc, exercise) => {
        return acc + exercise.exerciseTotalPoints;
      }, 0)
    );
  }, [workout]);

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
                  <i className="fas fa-arrow-circle-left"></i>
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

              {/* Button to post a workout */}
              {/* <NavLink to={`/posting/edit/${id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </NavLink>
              ................................. */}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {workout.description}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <div className="flex justify-between">
                  {renderWorkoutStatus(workout)}
                  {workout.status === "Done!" ? (
                    <div>
                      <i
                        className="fas fa-share-square pr-3 text-green-600 animate-pulse"
                        onClick={() => history.push(`/posting/edit/${id}`)}
                      ></i>
                      <i
                        className="fas fa-copy text-green-600 animate-pulse"
                        onClick={() => history.push(`/workout/duplicate/${id}`)}
                      ></i>
                    </div>
                  ) : (
                    <i
                      className="fas fa-check-square text-green-600 animate-pulse"
                      onClick={() =>
                        history.push(
                          `/workout/${id}/done/${workoutTotalPoints}`
                        )
                      }
                    ></i>
                  )}
                </div>
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
                  {workoutTotalPoints.toFixed(0).toLocaleString("pt-BR")}
                </dd>
              </div>

              <ExerciseList
                workout={workout}
                showForm={showForm}
                setShowForm={setShowForm}
                setExerciseToUpdate={setExerciseToUpdate}
                scrollRef={scrollRef}
                handleDeleteClick={handleDeleteClick}
              />
              {workout.status === "Done!" ? (
                <button className="w-full px-4 py-2 tracking-wide text-green-800 rounded transform bg-green-100">
                  Workout is completed
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowForm(!showForm);
                    setExerciseToUpdate({
                      category: "",
                      exerciseName: "",
                      exerciseReps: 0,
                    });
                    scrollRef.current.scrollIntoView();
                  }}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600 animate-bounce"
                >
                  Add a new exercise to this workout
                </button>
              )}

              {showForm ? (
                exerciseToUpdate._id ? (
                  <ExerciseEdit
                    exerciseToUpdate={exerciseToUpdate}
                    handleClose={setShowForm}
                    setExerciseChanged={setExerciseChanged}
                  />
                ) : (
                  <>
                    <ExerciseCreate
                      handleClose={setShowForm}
                      setExerciseChanged={setExerciseChanged}
                    />
                  </>
                )
              ) : null}
              <div ref={scrollRef} />
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
