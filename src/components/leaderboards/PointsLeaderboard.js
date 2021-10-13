import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";

import LoadingSpinner from "../structure/loading/LoadingSpinner";
import Pagination from "../structure/pagination/Pagination";

function PointsLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageChanged, setPageChanged] = useState(true);

  const LIMIT_PER_PAGE = 10;

  useEffect(() => {
    let isComponentMounted = true;
    async function fetchLeaderboardData() {
      try {
        setLoading(true);
        const response = await api.get(`/users-leaderboard/pg/${currentPage}`);
        if (isComponentMounted) {
          if (pageChanged) {
            setLeaderboard([...response.data]);
            setPageChanged(false);
          }

          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchLeaderboardData();
    return () => {
      isComponentMounted = false;
    };
  }, [leaderboard, currentPage, pageChanged]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="mt-2 mx-auto lg:max-w-5xl">
      <div
        className="bg-gray-100 py-1 rounded mb-1 flex text-gray-500 justify-center items-center"
        onClick={() => {
          setShowLeaderboard(!showLeaderboard);
        }}
      >
        <span className="whitespace-nowrap text-sm font-medium pr-3">
          <i
            className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-2xl"
            onClick={() => history.goBack()}
          ></i>
        </span>
        <h5 className="font-medium uppercase tracking-wider">
          LEADERBOARD: SO FIT POINTS
        </h5>
        <div>
          {showLeaderboard ? (
            <i className="fas fa-chevron-up pl-4 animate-pulse"></i>
          ) : (
            <i className="fas fa-chevron-down pl-4 animate-pulse"></i>
          )}
        </div>
      </div>
      {showLeaderboard ? (
        <>
          <table className="w-full divide-y divide-gray-200 mt-2">
            <thead className="bg-gray-200">
              <tr className="bg-indigo-600 text-white font-medium">
                <th
                  scope="col"
                  className="px-2 py-2 text-xs uppercase tracking-wider text-center"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs uppercase tracking-wider text-left"
                >
                  Athlete
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs uppercase tracking-wider text-center"
                >
                  Level
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs uppercase tracking-wider text-center"
                >
                  So Fit Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((user, index) => {
                let bgColor = "";
                if (index % 2 === 0) {
                  bgColor = "white";
                } else {
                  bgColor = "rgb(240,240,240)";
                }
                return (
                  <tr
                    className="hover:bg-gray-100"
                    style={{ backgroundColor: bgColor }}
                    key={user._id}
                    onClick={() => history.push(`user/${user._id}`)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-center text-gray-500">
                      {index + 1 + (currentPage - 1) * LIMIT_PER_PAGE}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-gray-500">
                      {user.level}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center text-gray-500">
                      {Number(user.soFitPoints.toFixed(0)).toLocaleString(
                        "pt-BR"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setPageChanged={setPageChanged}
          />
        </>
      ) : null}
    </div>
  );
}

export default PointsLeaderboard;
