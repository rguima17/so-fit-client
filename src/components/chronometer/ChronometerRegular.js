import { useState, useRef } from "react";

export default function ChronometerRegular() {
  const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null);

    const handleStart = () => {
      setIsActive(true);
      setIsPaused(true);
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
    };

    const handlePause = () => {
      clearInterval(countRef.current);
      setIsPaused(false);
    };

    const handleResume = () => {
      setIsPaused(true);
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
    };

    const handleReset = () => {
      clearInterval(countRef.current);
      setIsActive(false);
      setIsPaused(false);
      setTimer(0);
    };

    return {
      timer,
      isActive,
      isPaused,
      handleStart,
      handlePause,
      handleResume,
      handleReset,
    };
  };

  const Timer = () => {
    const {
      timer,
      isActive,
      isPaused,
      handleStart,
      handlePause,
      handleResume,
      handleReset,
    } = useTimer(0);

    const formatTime = (timer) => {
      const getMilliseconds = `0${Math.floor(timer % 100)}`.slice(-2);
      const getSeconds = `0${Math.floor(timer / 100) % 60}`.slice(-2);
      const getMinutes = `0${Math.floor(timer / (60 * 100))}`.slice(-2);
      // const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

      return `${getMinutes} : ${getSeconds} : ${getMilliseconds}`;
    };

    return (
      <div className='bg-gray-700 text-white max-h-full md:max-h-screen py-8'>
        {/* container chronometer */}
        <div>
          <h3 className='pt-4 mb-8 text-4xl text-center'>REGULAR</h3>
        </div>

        <div className='pb-16 flex iten-center justify-center'>
          <p className='static shadow-2xl border-2 border-indigo-600 bg-gray-700 rounded-full h-60 w-60 flex items-center pl-5 text-4xl slashed-zero'>
            {formatTime(timer)}
          </p>
        </div>

        <div className='text-3xl pb-20 '>
          <div className='flex justify-center h-20'>
            {!isActive && !isPaused ? (
              <button
                className='font-medium w-40 h-16 text-white py-2 px-3 rounded-md bg-indigo-600 hover:bg-indigo-700 '
                onClick={handleStart}
              >
                Start
              </button>
            ) : isPaused ? (
              <button
                className='font-medium w-40 h-16 text-white py-2 px-3 rounded-md bg-indigo-600 hover:bg-indigo-700'
                onClick={handlePause}
              >
                Pause
              </button>
            ) : (
              <button
                className='font-medium w-40 h-16 text-white py-2 px-3 rounded-md bg-indigo-600 hover:bg-indigo-700 '
                onClick={handleResume}
              >
                Resume
              </button>
            )}
          </div>
          <div className='flex justify-center '>
            <button
              className='font-medium w-40 h-16 text-white py-2 px-3 rounded-md bg-indigo-600 hover:bg-indigo-700 '
              onClick={handleReset}
              disabled={!isActive}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  };

  return <Timer />;
}
