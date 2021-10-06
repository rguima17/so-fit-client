import { useState, useRef } from "react";
import OptionsModal from "./OptionsModal";

export default function ChronometerTabata() {
  const useTimer = (initialState = 0) => {
    const [timerTabata, setTimerTabata] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRefTabata = useRef(null);
    const [options, setOptions] = useState({
      prepare: 10,
      work: 20,
      rest: 20,
      cycles: 8,
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
      if (getCurrentTarget(timerTabata)) {
        let instantTimeSeconds = Math.floor(timerTabata / 100);

        let getSecondsTime = 0;

        if (getCurrentTarget(timerTabata).text === "prepare") {
          getSecondsTime = `0${Math.floor(
            getCurrentTarget(timerTabata).value + instantTimeSeconds
          )}`.slice(-2);
        } else if (getCurrentTarget(timerTabata).text === "work") {
          getSecondsTime = `0${Math.floor(
            getCurrentTarget(timerTabata).value +
              options.prepare +
              (options.rest + options.work) * (getCurrentCycle() - 1) +
              instantTimeSeconds
          )}`.slice(-2);
        } else {
          getSecondsTime = `0${Math.floor(
            getCurrentTarget(timerTabata).value +
              options.prepare +
              options.rest * (getCurrentCycle() - 1) +
              options.work * getCurrentCycle() +
              instantTimeSeconds
          )}`.slice(-2);
        }

        return `00 : ${getSecondsTime}`;
      } else {
        return "00 : 00";
      }
    };

    const getCurrentTarget = (timerTabata) => {
      const currentTarget = [
        { text: "prepare", value: options.prepare },
        { text: "work", value: options.work },
        { text: "rest", value: options.rest },
      ];

      let getSecondsT = Math.floor(timerTabata / 100);

      let timeArray = determineTimeArray();

      // canceling condition
      if (timerTabata * -1 === CalcTabata() * 100) {
        handleReset();
      }

      if (getSecondsT > options.prepare * -1) {
        return currentTarget[0];
      }

      for (let i = 0; i < timeArray.length; i++) {
        if (getSecondsT > timeArray[i] * -1) {
          if (i % 2 === 0) {
            return currentTarget[1];
          } else {
            return currentTarget[2];
          }
        }
      }
    };

    const determineTimeArray = () => {
      let timeArray = [0, options.prepare];
      for (let i = 1; i <= options.cycles * 2; i++) {
        if (i % 2 !== 0) {
          timeArray.push(options.work + timeArray[i]);
        } else {
          timeArray.push(options.rest + timeArray[i]);
        }
      }
      return timeArray;
    };

    const getCurrentCycle = () => {
      let instantTime = Math.floor(timerTabata / 100);

      if (instantTime > options.prepare * -1) {
        return 0;
      }
      for (
        let currentCycle = 1;
        currentCycle <= options.cycles;
        currentCycle++
      ) {
        if (
          instantTime >
          (options.prepare + currentCycle * (options.work + options.rest)) * -1
        ) {
          return currentCycle;
        }
      }
      return options.cycles;
    };

    const handleChange = async (event) => {
      await setOptions({
        ...options,
        [event.target.name]: parseInt(event.target.value),
      });
    };

    const handleClose = () => {
      setOptions({
        prepare: 10,
        work: 20,
        rest: 20,
        cycles: 8,
        tabatas: 1,
      });
    };

    return (
      <div className='bg-gray-800 max-h-full md:max-h-screen'>
        <OptionsModal
          handleClose={handleClose}
          handleChange={handleChange}
          options={options}
        />
        <div className='text-white'>
          {/* container Current step */}
          <div className=''>
            <div>
              <h3 className='pt-4 mb-8 text-4xl text-center'>
                CHONOMETER TABATAS
              </h3>
            </div>
            <div className='flex iten-center justify-center'>
              <div className='flex flex-col shadow-2xl border-4 border-gray-100 bg-gray-800 rounded-full h-60 w-60 flex items-center justify-center text-4xl slashed-zero'>
                <h3 className='pt-2 mb-6 text-4xl text-center'>
                  {/* {currentTargetText(timerTabata)} */}{" "}
                  {getCurrentTarget(timerTabata)
                    ? getCurrentTarget(timerTabata).text
                    : "end"}
                </h3>

                <div>{formatTimerTabataDetails(timerTabata)}</div>
              </div>
            </div>
          </div>

          <div className='flex justify-between '>
            {/* container timer decressive (TOTAL TABATA) */}
            <div className='container md:container md:mx-auto'>
              <div>
                <h3 className='pt-10 mb-2 text-2xl text-center'>Total:</h3>
              </div>

              <div className='pb-16 flex iten-center justify-center'>
                <p className='shadow-2xl border-4 border-gray-100 bg-gray-800 rounded-full h-24 w-24 flex items-center justify-center text-2xl slashed-zero'>
                  {FormatTabata(timerTabata)}
                </p>
              </div>
            </div>

            {/* container cycles */}
            <div className=' container md:container md:mx-auto'>
              <div>
                <h3 className='pt-10 mb-2 text-2xl text-center'>Cycles:</h3>
              </div>

              <div className='pb-16 flex iten-center justify-center'>
                <p className='shadow-2xl border-4 border-gray-100 bg-gray-800 rounded-full h-24 w-24 flex items-center justify-center text-2xl slashed-zero'>
                  {getCurrentCycle()}/{options.cycles}
                </p>
              </div>
            </div>

            {/* container tabatas */}
            <div className='container md:container md:mx-auto'>
              <div>
                <h3 className='pt-10 mb-2 text-2xl text-center'>Tabatas:</h3>
              </div>
              <div className='pb-16 flex iten-center justify-center'>
                <p className='shadow-2xl border-4 border-gray-100 bg-gray-800 rounded-full h-24 w-24 flex items-center justify-center text-2xl slashed-zero'>
                  {options.tabatas}
                </p>
              </div>
            </div>
          </div>

          <div className='flex justify-around'>
            <div className=' text-center '>
              {!isActive && !isPaused ? (
                <i
                  className='fas fa-play-circle py-2 px-4 text-7xl w-40 h-16'
                  onClick={handleStartRegressive}
                ></i>
              ) : isPaused ? (
                <button
                  className='text-center text-3xl w-40 h-16 hover:bg-gray-600 border-4 border-gray-100 text-white font-bold py-2 px-4 rounded'
                  onClick={handlePause}
                >
                  Pause
                </button>
              ) : (
                <button
                  className='text-center text-3xl w-40 h-16 hover:bg-gray-600 border-4 border-gray-100 text-white font-bold py-2 px-4 rounded'
                  onClick={handleResume}
                >
                  Resume
                </button>
              )}
            </div>
            <div className=' '>
              <button
                className=' text-center text-3xl w-40 h-16 hover:bg-gray-600 border-4 border-gray-100 text-white font-bold  py-2 px-4 mb-10 rounded '
                onClick={handleReset}
                disabled={!isActive}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <Timer />;
}
