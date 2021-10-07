import React from "react";

export default function OptionsModal(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className='absolute top-32 left-5 text-4xl text-white'
        type='button'
        onClick={() => setShowModal(true)}
      >
        <h3>
          <i className='fas fa-cog'></i>
        </h3>
      </button>

      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='bg-gray-300 flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>Settings</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='bg-gray-300 relative p-6 flex-auto'>
                  <form>
                    <label className='block'>
                      <span className='text-gray-700'>Prepare (seconds)</span>
                      <input
                        step='5'
                        min='10'
                        type='number'
                        className='form-input mt-1 block w-full'
                        placeholder='Prepare Value'
                        name='prepare'
                        value={props.options.prepare}
                        onChange={props.handleChange}
                      />
                    </label>
                    <label className='block'>
                      <span className='text-gray-700'>Work (seconds)</span>
                      <input
                        step='5'
                        min='10'
                        type='number'
                        className='form-input mt-1 block w-full'
                        placeholder='Work Value'
                        name='work'
                        value={props.options.work}
                        onChange={props.handleChange}
                      />
                    </label>
                    <label className='block'>
                      <span className='text-gray-700'>Rest (seconds)</span>
                      <input
                        step='5'
                        min='10'
                        type='number'
                        className='form-input mt-1 block w-full'
                        placeholder='Rest Value'
                        name='rest'
                        value={props.options.rest}
                        onChange={props.handleChange}
                      />
                    </label>
                    <label className='block'>
                      <span className='text-gray-700'>
                        Cycles (repetitions)
                      </span>
                      <input
                        min='1'
                        max='20'
                        type='number'
                        className='form-input mt-1 block w-full'
                        placeholder='Cycles Value'
                        name='cycles'
                        value={props.options.cycles}
                        onChange={props.handleChange}
                      />
                    </label>
                  </form>
                </div>

                {/*footer*/}
                <div className='bg-gray-300 flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => {
                      setShowModal(false);
                      props.handleClose();
                    }}
                  >
                    Close
                  </button>
                  <button
                    className='bg-indigo-600 hover:bg-indigo-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
