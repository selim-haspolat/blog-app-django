import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, token } = useSelector((state: any) => state.auth);
  const { logout } = useAuthCall();
  const [menuBar, setMenuBar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentPage = useLocation().pathname;

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              onClick={() => setMenuBar(!menuBar)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${menuBar ? "hidden" : "block"}  h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className={`${!menuBar ? "hidden" : "block"} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link
                  to="/"
                  className={`${
                    currentPage === "/"
                      ? " bg-gray-900 text-white "
                      : "text-gray-300 hover:bg-gray-700 hover:text-white "
                  } rounded-md px-3 py-2 text-base font-medium`}
                >
                  Dashboard
                </Link>
                {user && (
                  <>
                    <Link
                      to="/new-blog"
                      className={`${
                        currentPage === "/new-blog"
                          ? " bg-gray-900 text-white "
                          : "text-gray-300 hover:bg-gray-700 hover:text-white "
                      } rounded-md px-3 py-2 text-base font-medium block`}
                      role="menuitem"
                    >
                      New Blog
                    </Link>
                    <Link
                      to="/my-blogs"
                      className={`${
                        currentPage === "/my-blogs"
                          ? " bg-gray-900 text-white "
                          : "text-gray-300 hover:bg-gray-700 hover:text-white "
                      } rounded-md px-3 py-2 text-base font-medium block`}
                      role="menuitem"
                    >
                      My Blogs
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {user ? (
              <div className="relative z-20 ml-3">
                <div>
                  <button
                    type="button"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        user.image ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      }
                      alt="user image"
                    />
                  </button>
                </div>
                {/*
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          */}
                <div
                  className={`${
                    showProfileMenu ? "block" : "hidden"
                  } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  {/* Active: "bg-gray-100", Not Active: "" */}
                  <Link
                    onClick={() => setShowProfileMenu(false)}
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout(token);
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className={`${
                    currentPage === "/login"
                      ? " bg-gray-900 text-white "
                      : "text-gray-300 hover:bg-gray-700 hover:text-white "
                  } rounded-md px-3 py-1.5 text-sm font-medium block`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${
                    currentPage === "/register"
                      ? " bg-gray-900 text-white "
                      : "text-gray-300 hover:bg-gray-700 hover:text-white "
                  } rounded-md px-3 py-1.5 text-sm font-medium block`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`${
          menuBar ? "h-36 border-b border-white" : "h-0"
        } absolute w-full z-10 bg-gray-800 transition-all overflow-hidden sm:h-0`}
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          <Link
            onClick={() => setMenuBar(false)}
            to="/"
            className={`${
              currentPage === "/"
                ? " bg-gray-900 text-white "
                : "text-gray-300 hover:bg-gray-700 hover:text-white "
            } rounded-md px-3 py-2 text-base font-medium block`}
          >
            Dashboard
          </Link>
          {user && (
            <>
              <Link
                onClick={() => setMenuBar(false)}
                to="/new-blog"
                className={`${
                  currentPage === "/new-blog"
                    ? " bg-gray-900 text-white "
                    : "text-gray-300 hover:bg-gray-700 hover:text-white "
                } rounded-md px-3 py-2 text-base font-medium block`}
                role="menuitem"
              >
                New Blog
              </Link>
              <Link
                onClick={() => setMenuBar(false)}
                to="/my-blogs"
                className={`${
                  currentPage === "/my-blogs"
                    ? " bg-gray-900 text-white "
                    : "text-gray-300 hover:bg-gray-700 hover:text-white "
                } rounded-md px-3 py-2 text-base font-medium block`}
                role="menuitem"
              >
                My Blogs
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
