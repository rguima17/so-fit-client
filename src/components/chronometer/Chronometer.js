import { useState, useRef } from "react";
import "./chronometer.css";

export default function Chronometer() {
  const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [tabata, setTabata] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null);
    // const [options, setOptions] = useState({
    //   prepare: 0,
    //   work: 0,
    //   rest: 0,
    //   cycles: 0,
    //   tabatas: 0,
    // });

    const handleStartRegressive = () => {
      countRef.current = setInterval(() => {
        setTabata((tabata) => tabata - 1);
      }, 10);
      console.log(tabata);
    };

    const handleStart = () => {
      setIsActive(true);
      setIsPaused(true);
      handleStartRegressive();
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
    };

    const handleResume = () => {
      setIsPaused(true);
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
    };

    const handlePause = () => {
      clearInterval(countRef.current);
      setIsPaused(false);
    };

    const handleReset = () => {
      clearInterval(countRef.current);
      setIsActive(false);
      setIsPaused(false);
      setTimer(0);
      setTabata(0);
    };

    return {
      timer,
      tabata,
      isActive,
      isPaused,
      handleStart,
      handlePause,
      handleResume,
      handleReset,
      handleStartRegressive,
    };
  };

  const Timer = () => {
    const {
      timer,
      tabata,
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

    const FormatTabata = (tabata) => {
      const result = 6000; //result é a soma do prepare, work, rest, cycles e tabatas
      tabata = tabata + result;
      const getSecondsT = `0${Math.floor(tabata / 100) % 60}`.slice(-2);
      const getMinutesT = `0${Math.floor(tabata / (60 * 100))}`.slice(-2);

      return `${getMinutesT} : ${getSecondsT}`;
    };

    return (
      <div className='border border-dark'>
        <h3 className='border border-dark text-center'>Chronometer</h3>
        <div className='text-center'>
          <p>{formatTime(timer)}</p>
        </div>

        <h3 className='border border-dark text-center'>Tabata</h3>
        <div className='text-center'>
          <p>{FormatTabata(tabata)}</p>
        </div>
        <div>
          <div className='border border-dark text-center d-flex justify-content-around'>
            {!isActive && !isPaused ? (
              <button className='btn btn-danger' onClick={handleStart}>
                Start
              </button>
            ) : isPaused ? (
              <button className='btn btn-success' onClick={handlePause}>
                Pause
              </button>
            ) : (
              <button className='btn btn-primary' onClick={handleResume}>
                Resume
              </button>
            )}
            <button
              className='btn btn-warning'
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

  // const [diff, setDiff] = useState(null);
  // const [initial, setInitial] = useState(null);

  // const tick = () => {
  //   setDiff(new Date(+new Date() - initial));
  // };
  // const start = () => {
  //   setInitial(+new Date());
  // };

  // const stop = () => {};

  // useEffect(() => {
  //   if (initial) {
  //     requestAnimationFrame(tick);
  //   }
  // }, [initial]);

  // useEffect(() => {
  //   if (diff) {
  //     requestAnimationFrame(tick);
  //   }
  // }, [diff]);

  // const timeFormat = (date) => {
  //   if (!date) return "00:00:00";

  //   let mm = date.getUTCMinutes();
  //   let ss = date.getSeconds();
  //   let cm = Math.round(date.getMilliseconds() / 10);

  //   mm = mm < 10 ? "0" + mm : mm;
  //   ss = ss < 10 ? "0" + ss : ss;
  //   cm = cm < 10 ? "0" + cm : cm;

  //   return `${mm}:${ss}:${cm}`;
  // };

  // return (
  //   <div className='container col-12'>
  //     <h1 className='text-center'>Chronometer</h1>
  //     <p className='text-center'>{timeFormat(diff)}</p>
  //     <div className='text-center space-x-2 md:space-x-8'>
  //       <button
  //         className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
  //         onClick={start}
  //       >
  //         START
  //       </button>
  //       <button onClick={stop}>STOP</button>
  //       <button>RESET</button>
  //     </div>
  //   </div>
  // );
}
