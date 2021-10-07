import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import api from "../../../apis/api";

import LoadingSpinner from "../../structure/loading/LoadingSpinner";
import WorkoutCreate from "../WorkoutCreate";

import renderWorkoutStatus from "../../../scripts/renderWorkoutStatus";
import WorkoutListTable from "./WorkoutListTable";

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [workoutCreated, setWorkoutCreated] = useState(false);

  const [showPlannedList, setShowPlannedList] = useState(true);
  const [showDoneList, setShowDoneList] = useState(true);

  const history = useHistory();
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchWorkoutList() {
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
    fetchWorkoutList();
  }, [workoutCreated]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className='flex flex-col px-1 pt-1'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <div
                  className='bg-gray-100 py-1 rounded mb-1 flex items-center text-gray-500 justify-center pl-10'
                  onClick={() => {
                    setShowPlannedList(!showPlannedList);
                  }}
                >
                  <i
                    className='fas fa-arrow-circle-left text-indigo-600 text-xl pr-5'
                    onClick={() => history.push("/profile")}
                  ></i>
                  <h5 className='font-medium uppercase tracking-wider'>
                    Planned Workouts
                  </h5>
                  <div>
                    {showPlannedList ? (
                      <i className='fas fa-chevron-up pl-5 pr-7 animate-pulse'></i>
                    ) : (
                      <i className='fas fa-chevron-down pl-5 pr-7 animate-pulse'></i>
                    )}
                  </div>
                </div>
                {showPlannedList ? (
                  <WorkoutListTable
                    workouts={workouts}
                    history={history}
                    renderWorkoutStatus={renderWorkoutStatus}
                    targetStatus={"Planned"}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div
            className='my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'
            style={{
              width: "96vw",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <button
              onClick={() => {
                setShowForm(!showForm);
                scrollRef.current.scrollIntoView();
              }}
              className='w-full mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-gray-600 animate-bounce'
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
          <div ref={scrollRef} />
          <hr />
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <div
                  className='bg-gray-100 py-1 rounded mb-1 flex text-gray-500 justify-center pl-10'
                  onClick={() => {
                    setShowDoneList(!showDoneList);
                  }}
                >
                  <h5 className='font-medium uppercase tracking-wider'>
                    'Done!' Workouts
                  </h5>
                  <div>
                    {showDoneList ? (
                      <i className='fas fa-chevron-up pl-10 animate-pulse'></i>
                    ) : (
                      <i className='fas fa-chevron-down pl-10 animate-pulse'></i>
                    )}
                  </div>
                </div>
                {showDoneList ? (
                  <WorkoutListTable
                    workouts={workouts}
                    history={history}
                    renderWorkoutStatus={renderWorkoutStatus}
                    targetStatus={"Done!"}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
