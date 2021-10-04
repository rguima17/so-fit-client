import React from "react";

export default function OptionsModal(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className='border border-dark container md:container md:mx-auto'
        type='button'
        onClick={() => setShowModal(true)}
      >
        <h3>
          <i className='fas fa-cog'></i>
        </h3>
      </button>
      {/* <button
        className='text-white bg-indigo-600 hover:bg-indigo-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
        onClick={() => setShowModal(true)}
      >
        Settings Tabata
      </button> */}
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
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
                <div className='relative p-6 flex-auto'>
                  <form handleSubmit={props.handleSubmit}>
                    <div class='form-group'>
                      <label for='formGroupExampleInput'>Prepare</label>
                      <input
                        type='number'
                        class='form-control'
                        name='prepare'
                        id='formGroupExampleInput'
                        placeholder='Insert Prepare'
                        value={props.options.prepare}
                        onChange={props.handleChange}
                      />
                    </div>
                    <div class='form-group'>
                      <label for='formGroupExampleInput2'>Work</label>
                      <input
                        type='number'
                        class='form-control'
                        name='work'
                        id='formGroupExampleInput2'
                        placeholder='Insert Work'
                        value={props.options.work}
                        onChange={props.handleChange}
                      />
                    </div>
                    <div class='form-group'>
                      <label for='formGroupExampleInput2'>Rest</label>
                      <input
                        type='number'
                        class='form-control'
                        name='rest'
                        id='formGroupExampleInput2'
                        placeholder='Insert Rest'
                        value={props.options.rest}
                        onChange={props.handleChange}
                      />
                    </div>
                    <div class='form-group'>
                      <label for='formGroupExampleInput2'>Cyrcle</label>
                      <input
                        type='number'
                        class='form-control'
                        name='cycles'
                        id='formGroupExampleInput2'
                        placeholder='Insert Cyrcle'
                        value={props.options.cycles}
                        onChange={props.handleChange}
                      />
                    </div>
                    <div class='form-group'>
                      <label for='formGroupExampleInput2'>Tabata</label>
                      <input
                        type='number'
                        class='form-control'
                        name='tabatas'
                        id='formGroupExampleInput2'
                        placeholder='Insert Tabata'
                        value={props.options.tabatas}
                        onChange={props.handleChange}
                      />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    // onClick={props.handleClose}
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
