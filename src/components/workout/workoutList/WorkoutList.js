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
        <div className="px-1 pt-1 lg:max-w-3xl mx-auto  lg:mt-2">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div
                  className="bg-gray-100 py-1 rounded-md mb-1 flex items-center text-gray-500 justify-center pl-10"
                  onClick={() => {
                    setShowPlannedList(!showPlannedList);
                  }}
                >
                  <i
                    className="fas fa-arrow-circle-left text-indigo-600 text-xl pr-5"
                    onClick={() => history.goBack()}
                  ></i>
                  <h5 className="font-medium uppercase tracking-wider">
                    Planned Workouts
                  </h5>
                  <div>
                    {showPlannedList ? (
                      <i className="fas fa-chevron-up pl-5 pr-7 animate-pulse"></i>
                    ) : (
                      <i className="fas fa-chevron-down pl-5 pr-7 animate-pulse"></i>
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
            className="my-2  mx-auto overflow-x-auto sm:-mx-6  "
 
          >
            <button
              onClick={() => {
                setShowForm(!showForm);
                scrollRef.current.scrollIntoView();
              }}
              className=" lg:max-w-3xl  lg:ml-5  w-full mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600 animate-bounce"
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
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div
                  className="bg-gray-100 py-1 rounded mb-1 flex text-gray-500 justify-center pl-10"
                  onClick={() => {
                    setShowDoneList(!showDoneList);
                  }}
                >
                  <h5 className="font-medium uppercase tracking-wider">
                    'Done!' Workouts
                  </h5>
                  <div>
                    {showDoneList ? (
                      <i className="fas fa-chevron-up pl-10 animate-pulse"></i>
                    ) : (
                      <i className="fas fa-chevron-down pl-10 animate-pulse"></i>
                    )}
                  </div>
                </div>
                {showDoneList ? (
                  <>
                    {workouts.reduce((acc, element) => {
                      if (element.status === "Done!") {
                        return acc + 1;
                      }
                      return acc + 0;
                    }, 0) === 0 ? (
                      <div className="bg-gray-100 p-2 rounded-md font-light">
                        <p className="font-semibold">
                          To post you first workout:
                        </p>
                        <p className="pl-2 text-sm my-1">
                          1 - You need to plan it. By 'Add a new workout'.
                        </p>
                        <p className="pl-2 text-sm my-1">
                          2 - Open it, and list your exercises.
                        </p>
                        <p className="pl-2 text-sm my-1">
                          3 - Execute it! And finnally mark it as "Done!".
                        </p>
                      </div>
                    ) : (
                      <WorkoutListTable
                        workouts={workouts}
                        history={history}
                        renderWorkoutStatus={renderWorkoutStatus}
                        targetStatus={"Done!"}
                      />
                    )}
                  </>
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
