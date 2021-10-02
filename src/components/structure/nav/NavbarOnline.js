import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import Logo from "../../../img/Logo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Profile", href: "/profile", current: true },
  { name: "Workout", href: "/workout", current: false },
  { name: "xxxxxx", href: "#", current: false },
  { name: "Signup", href: "/auth/signup", current: false },
];

export default function NavBarOffline() {
  return (
    <Popover>
      <div className='bg-gray-800 relative pt-2 pb-2 px-3 sm:px-6 lg:px-8'>
        <nav
          className='relative flex items-center justify-between sm:h-10 lg:justify-start'
          aria-label='Global'
        >
          <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
            <div className='flex items-center justify-between w-full md:w-auto'>
              <div className='-mr-2 flex items-center md:hidden'>
                <Popover.Button className='bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              <Link to='/'>
                <span className='sr-only'>Workflow</span>
                <img
                  alt=''
                  className='h-10 w-auto sm:h-10'
                  src={Logo} //'https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                />
              </Link>
              {/* AQUI */}
              <div className='inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <button
                  type='button'
                  className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='#'
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='#'
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='#'
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className='hidden md:block md:ml-10 md:pr-4 md:space-x-8'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className='font-medium text-gray-500 hover:text-gray-900'
              >
                {item.name}
              </Link>
            ))}
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
          className='absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
        >
          <div className='rounded-lg shadow-md bg-gray-800 bg-opacity-80 ring-1 ring-black ring-opacity-5 overflow-hidden'>
            <div className='px-5 pt-4 flex items-center justify-between'>
              <div className='-mr-2'>
                <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Close main menu</span>
                  <XIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              <div>
                <img
                  className='h-8 w-auto'
                  src={Logo} //'https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                  alt='Logo'
                />
              </div>
            </div>

            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className='block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
