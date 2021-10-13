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
        <div className=" lg:max-w-3xl mx-auto  lg:mt-2 bg-white shadow overflow-hidden sm:rounded-lg rounded-lg">
          <div className="px-4 sm:px-6 text-center">
            <h3 className="flex items-center justify-center text-lg leading-6 font-medium text-gray-900">
              <span className="py-4 whitespace-nowrap text-right text-sm font-medium">
                <NavLink
                  to={`/workout`}
                  className="text-indigo-600 hover:text-indigo-900 text-lg"
                >
                  <i className="fas fa-arrow-circle-left text-2xl"></i>
                </NavLink>
              </span>
              <span className="pl-6 pr-4 text-xl">{workout.name}</span>
              <span className="pr-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NavLink
                  to={`/workout/edit/${id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-8 inline"
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
                className="fas fa-times text-red-400 text-2xl"
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
                <div className="flex justify-between">
                  {renderWorkoutStatus(workout)}
                  {workout.status === "Done!" ? (
                    <div>
                      <button
                        className="mr-3 bg-green-100 rounded-md animate-pulse px-1"
                        onClick={() => history.push(`/posting/edit/${id}`)}
                      >
                        <i className="fas fa-share-square text-green-600 pr-1"></i>
                        <span className="text-sm font-semibold text-green-600">
                          Post
                        </span>
                      </button>
                      <button
                        className="bg-green-100 rounded-md animate-pulse px-1"
                        onClick={() => history.push(`/workout/duplicate/${id}`)}
                      >
                        <i className="fas fa-copy text-green-600 animate-pulse pr-1"></i>
                        <span className="text-sm font-semibold text-green-600">
                          Copy
                        </span>
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-indigo-100 rounded-md animate-pulse px-1 text-indigo-600"
                      onClick={() =>
                        history.push(
                          `/workout/${id}/done/${workoutTotalPoints}`
                        )
                      }
                    >
                      <i className="fas fa-check-square animate-pulse pr-1"></i>
                      <span className="text-sm font-semibold ">
                        Mark it as Done!
                      </span>
                    </button>
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
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600 animate-bounce"
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
