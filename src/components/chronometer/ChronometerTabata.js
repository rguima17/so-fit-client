import { useState, useRef } from "react";
import OptionsModal from "./OptionsModal";

export default function ChronometerTabata() {
  const useTimer = (initialState = 0) => {
    const [timerTabata, setTimerTabata] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRefTabata = useRef(null);
    const [options, setOptions] = useState({
      prepare: 3,
      work: 3,
      rest: 3,
      cycles: 2,
      tabatas: 1,
    });

    const handleStartRegressive = () => {
      setIsActive(true);
      setIsPaused(true);
      countRefTabata.current = setInterval(() => {
        setTimerTabata((timerTabata) => timerTabata - 1);
      }, 10);
    };

    const handlePause = () => {
      clearInterval(countRefTabata.current);
      setIsPaused(false);
    };

    const handleResume = () => {
      setIsPaused(true);
      countRefTabata.current = setInterval(() => {
        setTimerTabata((timerTabata) => timerTabata - 1);
      }, 10);
    };

    const handleReset = () => {
      clearInterval(countRefTabata.current);
      setIsActive(false);
      setIsPaused(false);

      setTimerTabata(0);
    };

    const CalcTabata = () => {
      return (
        (options.prepare + (options.work + options.rest) * options.cycles) *
        options.tabatas
      );
    };

    return {
      timerTabata,
      isActive,
      isPaused,
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
      timerTabata,
      isActive,
      isPaused,
      handleStartRegressive,
      handlePause,
      handleResume,
      handleReset,
      CalcTabata,
      options,
      setOptions,
    } = useTimer(0);

    const FormatTabata = (timerTabata) => {
      const totalTabata = timerTabata + CalcTabata() * 100;
      const getSecondsT = `0${Math.floor(totalTabata / 100) % 60}`.slice(-2);
      const getMinutesT = `0${Math.floor(totalTabata / (60 * 100))}`.slice(-2);
      return `${getMinutesT} : ${getSecondsT}`;
    };

    const formatTimerTabataDetails = (timerTabata) => {
      const totalTabata = timerTabata + CalcTabata() * 100;
      const getSecondsT = `0${Math.floor(totalTabata / 100) % 60}`.slice(-2);
      const getMinutesT = `0${Math.floor(totalTabata / (60 * 100))}`.slice(-2);
      return `${getMinutesT} : ${getSecondsT}`;
    };

    const currentTargetText = (timerTabata) => {
      let getSecondsT = Math.floor(timerTabata / 100) % 60;

      const currentOption = Object.keys(options);
      const currentValue = Object.values(options);

      const prepareValue = currentValue[0] * -1;
      const workValue = currentValue[0] * -1;
      const restValue = currentValue[0] * -1;
      const cycleValue = currentValue[0];

      // console.log("timer", timerTabata * -1);
      // console.log("total tabata", CalcTabata() * 100);

      if (timerTabata * -1 === CalcTabata() * 100) {
        handleReset();
      }

      console.log("Seconds", getSecondsT);

      if (getSecondsT > prepareValue) {
        return currentOption[0];
      } else {
        for (let i = 1; i <= cycleValue; i++) {
          if (getSecondsT > workValue) {
            return currentOption[1];
          }
          if (getSecondsT > restValue) {
            return currentOption[2];
          }
          getSecondsT = getSecondsT - workValue - restValue;
        }
      }
    };

    const handleChange = (event) => {
      setOptions({
        ...options,
        [event.target.name]: parseInt(event.target.value),
      });
    };

    const handleClose = () => {
      setOptions({
        prepare: 3,
        work: 3,
        rest: 3,
        cycles: 2,
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

        {/* container timer decressive*/}
        <div className='border border-dark '>
          <h3 className='text-center text-base md:text-lg'>Total Tabata</h3>
          <div className='text-center '>
            <p>{FormatTabata(timerTabata)}</p>
          </div>
        </div>
        {/* container cycles */}
        <div className='border border-dark '>
          <h3 className='text-center text-base md:text-lg'>
            {currentTargetText(timerTabata)}
          </h3>
          <div className='text-center '>
            <p>{formatTimerTabataDetails(timerTabata)}</p>
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
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleStartRegressive}
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
