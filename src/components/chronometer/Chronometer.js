import { useState, useRef } from "react";
import OptionsModal from "./OptionsModal";

export default function Chronometer() {
  const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [timerTabata, setTimerTabata] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null);
    const countRefTabata = useRef(null);
    const [options, setOptions] = useState({
      prepare: 11,
      work: 20,
      rest: 10,
      cycles: 8,
      tabatas: 1,
    });

    const handleStartRegressive = () => {
      setIsActive(true);
      setIsPaused(true);
      countRefTabata.current = setInterval(() => {
        setTimerTabata((tabata) => tabata - 1);
      }, 10);
    };

    const handleStart = () => {
      setIsActive(true);
      setIsPaused(true);
      handleStartRegressive();
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
    };

    const handlePause = () => {
      clearInterval(countRef.current);
      clearInterval(countRefTabata.current);
      setIsPaused(false);
    };

    const handleResume = () => {
      setIsPaused(true);
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 10);
      countRefTabata.current = setInterval(() => {
        setTimerTabata((tabata) => tabata - 1);
      }, 10);
    };

    const handleReset = () => {
      clearInterval(countRef.current);
      clearInterval(countRefTabata.current);
      setIsActive(false);
      setIsPaused(false);
      setTimer(0);
      setTimerTabata(0);
    };

    const CalcTabata = () => {
      return (
        (options.prepare + (options.work + options.rest) * options.cycles) *
        options.tabatas
      );
    };

    return {
      timer,
      timerTabata,
      isActive,
      isPaused,
      handleStart,
      handlePause,
      handleResume,
      handleReset,
      handleStartRegressive,
      CalcTabata,
      options,
      setOptions,
    };
  };

  const Timer = () => {
    const {
      timer,
      timerTabata,
      isActive,
      isPaused,
      handleStart,
      handlePause,
      handleResume,
      handleReset,
      CalcTabata,
      options,
      setOptions,
    } = useTimer(0);

    const formatTime = (timer) => {
      const getMilliseconds = `0${Math.floor(timer % 100)}`.slice(-2);
      const getSeconds = `0${Math.floor(timer / 100) % 60}`.slice(-2);
      const getMinutes = `0${Math.floor(timer / (60 * 100))}`.slice(-2);
      // const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

      return `${getMinutes} : ${getSeconds} : ${getMilliseconds}`;
    };

    const FormatTabata = (timerTabata) => {
      const totalTabata = timerTabata + CalcTabata() * 100;

      const getSecondsT = `0${Math.floor(totalTabata / 100) % 60}`.slice(-2);
      const getMinutesT = `0${Math.floor(totalTabata / (60 * 100))}`.slice(-2);

      return `${getMinutesT} : ${getSecondsT}`;
    };

    const handleChange = (event) => {
      setOptions({
        ...options,
        [event.target.name]: parseInt(event.target.value),
      });
    };

    const handleClose = () => {
      setOptions({
        prepare: 10,
        work: 20,
        rest: 10,
        cycles: 8,
        tabatas: 1,
      });
      console.log(options);
    };

    return (
      <div className='mt-2 container flex-none md:flex-1'>
        <OptionsModal
          handleClose={handleClose}
          handleChange={handleChange}
          options={options}
        />

        {/* container chronometer */}
        <div className='border border-dark'>
          <h3 className='text-center'>Chronometer</h3>
          <div className='text-center'>
            <p>{formatTime(timer)}</p>
          </div>
        </div>
        {/* container timer decressive*/}
        <div className='border border-dark '>
          <h3 className='text-center text-base md:text-lg'>Tabata</h3>
          <div className='text-center '>
            <p>{FormatTabata(timerTabata)}</p>
          </div>
        </div>
        {/* container cycles */}
        <div className='border border-dark '>
          <h3 className='text-center text-base md:text-lg'>TabataTargetText</h3>
          <div className='text-center '>
            <p>{FormatTabata(timerTabata)}</p>
          </div>
        </div>
        {/* container cycles */}
        <div className='flex '>
          <div className='border border-dark container md:container md:mx-auto'>
            <div className='text-center text-base md:text-lg'>Cycles</div>
            <h3 className='text-center text-base md:text-lg'>
              {options.cycles}
            </h3>
          </div>
          {/* container tabatas */}
          <div className='border border-dark container md:container md:mx-auto'>
            <div className='text-center text-base md:text-lg'>Tabatas</div>
            <h3 className='text-center text-base md:text-lg'>
              {options.tabatas}
            </h3>
          </div>
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
}
