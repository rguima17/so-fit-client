import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import Logo from "../../../assets/img/Logo.png";

const navigation = [
  { name: "Login", href: "/auth/login", current: false },
  { name: "Signup", href: "/auth/signup", current: false },
  { name: "Leaderboards", href: "/points-leaderboard", current: true },
  { name: "Chronometers", href: "/chronometer", current: false },
];

export default function NavBarOffline() {
  return (
    <Popover>
      <div className='bg-gray-800 relative pt-2 pb-2 px-2 sm:px-6 lg:px-1 '>
        <nav
          className='flex items-center justify-between sm:h-10 lg:justify-between'
          aria-label='Global'
        >
          <div className='hidden md:block md:ml-2 md:pr-2 md:space-x-8'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className='font-medium text-white hover:text-gray-900'
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
            <div className='flex items-center justify-between w-full md:w-auto'>
              <div className='-mr-2 flex items-center md:hidden'>
                <Popover.Button className='bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              <Link to='/'>
                <span className='sr-only'>So fit</span>
                <img
                  alt='logo So fit'
                  className='h-10 w-auto sm:h-10 lg:mr-5 mr-3'
                  src={Logo}
                />
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter='duration-150 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute z-10 top-12 inset-x-0 p-2 transition transform origin-top-right md:hidden'
        >
          <div className='rounded-lg shadow-md bg-gray-800 bg-opacity-95 ring-1 ring-black ring-opacity-5 overflow-hidden'>
            <div className='px-4 pt-4 flex items-center justify-between'>
              <div className='-mr-2'>
                <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Close main menu</span>
                  <XIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              <div>
                <img className='h-8 w-auto' src={Logo} alt='Logo' />
              </div>
            </div>
            <Popover.Button>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className='block px-3 py-2 rounded-md text-left text-base font-medium text-white hover:text-gray-900 hover:bg-gray-500'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Popover.Button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
