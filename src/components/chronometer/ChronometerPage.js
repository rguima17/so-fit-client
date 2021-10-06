import { useState } from "react";

import ChronometerRegular from "./ChronometerRegular";
import ChronometerTabata from "./ChronometerTabata";

function ChronometerPage() {
  const [showTabataChronometer, setShowTabataChronometer] = useState(false);

  return (
    <div className='flex flex-col px-1 pt-1'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full '>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <div
              className='bg-gray-100 pt-1 rounded  text-gray-500'
              onClick={() => {
                setShowTabataChronometer(!showTabataChronometer);
              }}
            >
              <div className='flex justify-center '>
                <h5 className='font-medium text-2xl uppercase tracking-wider'>
                  Chronometer
                </h5>
                <div>
                  {showTabataChronometer ? (
                    <i className='flex fas fa-chevron-up pl-10 animate-pulse text-2xl'></i>
                  ) : (
                    <i className='flex fas fa-chevron-down pl-10 animate-pulse text-2xl'></i>
                  )}
                </div>
              </div>
            </div>
            {showTabataChronometer ? (
              <ChronometerRegular />
            ) : (
              <ChronometerTabata />
            )}
          </div>
        </div>
      </div>

      {/* <h2>Regular Chronometer</h2>
      <p>Breve descrição?</p>
      <ChronometerRegular />
      <h2>Tabata Chronometer</h2>
      <p>Breve descrição?</p>
      <ChronometerTabata /> */}
    </div>
  );
}

export default ChronometerPage;
