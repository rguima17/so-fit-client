// import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

import logo from "../assets/img/Logo.png";
import imgBiking from "../assets/img/slides/Bike.png";
import imgRunning from "../assets/img/slides/Running.jpg";
import imgPullUp from "../assets/img/slides/Pull-Up.jpg";
import imgExercise from "../assets/img/slides/Exercise.jpg";

function Home() {
  return (
  
    <div className='relative bg-white overflow-hidden pb-12  h-auto'>
      <div className='max-w-5xl :'>
        <div className='z-10 pb-8 bg-white sm:pb-16 md:pb-20 xl:max-w-2xl xl:w-full xl:pb-28 xl:pb-32'>
    

          <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 xl:mt-20 xl:px-8 xl:mt-28'>
            <div className='sm:text-center xl:text-left'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                <div className='flex justify-start mb-6'>
                  <span className='block xl:inline'>So Fit</span>
                  <img className='h-8 w-auto mx-3' src={logo} alt='Logo' />
                </div>

                <span className='block text-indigo-600 xl:inline my-6'>
                  Your fitness social network. Finally!
                </span>
              </h1>
              <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg my-12 sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl xl:mx-0'>
                There is no miracle training, there is no magic diet. What
                exists is focus, discipline, perseverance and most importantly,
                never give up.
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center xl:justify-start'>
                <div className='rounded-md shadow'>
                  <Link
                    to='/auth/login'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
  
  </div>
   {/* slider */}
      <div className='    xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2 xl:my-24  xl:mx-4 '>
        <div id='slider' className='rounded-lg bg-blue-500 '>
          <figure>
            <img src={imgPullUp} alt='' />
            <img src={imgBiking} alt='' />
            <img src={imgRunning} alt='' />
            <img src={imgExercise} alt='' />
            <img src={imgPullUp} alt='' />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Home;
