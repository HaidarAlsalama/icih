import React, { useContext, useEffect, useState } from "react";
import logo from "./../../../images/logo2.png";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/reducers/authReducer";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth } = useSelector((state) => state);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="md:px-2 text-sm">
      <nav className="container max-w-6xl mx-auto md:rounded-b-md shadow-lg dark:shadow-none bg-white border-gray-200 dark:bg-gray-800">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="dark:filter dark:invert dark:grayscale">
              <img src={logo} className="h-10" alt="Flowbite Logo" />
            </div>
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col gap-3 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  الرئيسية
                </Link>
              </li>
              <li className="dropdown md:relative rounded hover:bg-gray-100 md:hover:bg-transparent  md:dark:hover:text-blue-500  dark:hover:bg-gray-700 md:dark:hover:bg-transparent">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 md:hover:text-blue-700   text-gray-700   md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white  dark:focus:text-white dark:border-gray-700"
                >
                  خدمات
                  <svg
                    className="w-2.5 h-2.5 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className="dropdownNavbar md:-left-3/4 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <Link
                        to="/show-dividers"
                        className="block px-4 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        عرض المناطق والمقاسم
                      </Link>
                    </li>
                    {auth.role == "subscriper" ? (
                      <>
                        <li>
                          <Link
                            to="/reservation-form"
                            className="block px-4 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            احجز مقسمك
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/show-my-requests"
                            className="block px-4 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            عرض طلباتي
                          </Link>
                        </li>
                      </>
                    ) : null}
                  </ul>
                  {/* <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </div> */}
                </div>
              </li>
              {/* <li>
                <Link
                  to="/reservation-form"
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  حجز مقسم
                </Link>
              </li> */}
              {auth.role == "guest" ? (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    دخول
                  </Link>
                </li>
              ) : (
                <li>
                  <span
                    className="cursor-pointer block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={() => {dispatch(logout()); window.location.reload('/')}}
                  >
                    خروج
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
