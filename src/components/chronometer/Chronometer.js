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
      <div className=' bg-gray-800 text-white max-h-full md:max-h-screen'>
        {/* container chronometer */}
        <div>
          <h3 className='pt-4 mb-8 text-4xl text-center'>CHONOMETER</h3>
        </div>

        <div className='pb-16 flex iten-center justify-center'>
          <p className=' shadow-2xl border-4 border-gray-100 bg-gray-800 rounded-full h-60 w-60 flex items-center justify-center text-4xl slashed-zero'>
            {formatTime(timer)}
          </p>
        </div>

        <div className='text-4xl pb-20 '>
          <div className='flex justify-center h-20'>
            {!isActive && !isPaused ? (
              <i
                className='fas fa-play-circle py-2 px-4 text-7xl '
                onClick={handleStart}
              ></i>
            ) : isPaused ? (
              <button
                className='text-center w-40 h-16 hover:bg-gray-600 border-4 border-gray-100 text-white font-bold py-2 px-4 rounded'
                onClick={handlePause}
              >
                Pause
              </button>
            ) : (
              <button
                className='text-center w-40 h-16 hover:bg-gray-600 border-4 border-gray-100 text-white font-bold py-2 px-4 rounded'
                onClick={handleResume}
              >
                Resume
              </button>
            )}
          </div>
          <div className='flex justify-center'>
            <button
              className=' text-center w-40 h-16 hover:bg-gray-600 border-4 border-gray-100 text-white font-bold my-12 py-2 px-4 rounded '
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
