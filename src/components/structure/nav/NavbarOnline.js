import { AuthContext } from "../../../contexts/authContext";
import { Link } from "react-router-dom";
import { Fragment, useContext, useState, useEffect } from "react";

import { Popover, Transition, Menu } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import api from "../../../apis/api";
import Logo from "../../../assets/img/Logo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Profile", href: "/profile", current: false },
  { name: "Feed", href: "/user-feed", current: false },
  { name: "Workouts", href: "/workout", current: false },
  { name: "Chronometer", href: "/chronometer", current: false },
  { name: "ChronometerTabata", href: "/chronometer-tabata", current: false },
];

export default function NavBarOffline() {
  const { logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/profile");

        setProfile({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchProfile();
  }, []);

  return (
    <Popover>
      <div className='bg-gray-800 relative pt-2 pb-2 px-2 sm:px-6 lg:px-8'>
        <nav
          className='flex items-center justify-between sm:h-10 lg:justify-between'
          aria-label='Global'
        >
          <div className='hidden md:block md:ml-10 md:pr-4 md:space-x-8'>
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

          <div className='flex items-center flex-grow flex-shrink-0'>
            <div className='flex items-center justify-between md:justify-between w-full '>
              <div className='-mr-2 flex items-center md:hidden'>
                <Popover.Button className='bg-gray-800 rounded-md p-2 inline-flex items-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              <div>
                <Link to='/'>
                  <span className='sr-only'>LOGO</span>
                  <img
                    alt='logo'
                    className='ml-5 h-10 w-auto sm:h-10'
                    src={Logo}
                  />
                </Link>
              </div>

              {/*profile notification */}
              <div className='inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* notification bell */}
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
                        className='mx-auto object-cover rounded-full h-8 w-8 '
                        src={profile.pictureUrl} //'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt={`User ${profile.name}`}
                      />
                    </Menu.Button>
                  </div>

                  {/* desktop */}
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    {/* painel log */}
                    <Menu.Items className='origin-top-right top-9 w-40 absolute z-40 right-0 mt-2  rounded-md shadow-lg py-1 bg-gray-800 bg-opacity-90 ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/profile'
                            className={classNames(
                              active ? "bg-gray-500" : "",
                              "block px-4 py-2 text-sm text-right text-white"
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
                              active ? "bg-gray-500" : "",
                              "block px-4 py-2 text-sm text-right text-white"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            onClick={logout}
                            to='#'
                            className={classNames(
                              active ? "bg-gray-500" : "",
                              "block px-4 py-2 text-sm text-right text-white"
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
        {/* painel geral */}
        <Popover.Panel
          focus
          className='absolute z-40 w-80 top-12 inset-x-0 p-2 transition transform origin-top-right md:hidden'
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
                    className='block px-3 py-2 rounded-md text-left font-medium text-white hover:text-gray-900 hover:bg-gray-500'
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
