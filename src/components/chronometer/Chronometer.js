import { useState, useRef } from "react";

export default function Chronometer() {
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
      <div className='mt-2 container flex-none md:flex-1'>
        {/* container chronometer */}
        <div className='border border-dark'>
          <h3 className='text-center'>Chronometer</h3>
          <div className='text-center'>
            <p>{formatTime(timer)}</p>
          </div>
        </div>

        <div>
          <div className='border border-dark text-center d-flex justify-content-around'>
            {!isActive && !isPaused ? (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleStart}
              >
                Start
              </button>
            ) : isPaused ? (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handlePause}
              >
                Pause
              </button>
            ) : (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleResume}
              >
                Resume
              </button>
            )}
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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
