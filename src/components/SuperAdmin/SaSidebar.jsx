import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { BiBookContent } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import { PiTelegramLogo } from "react-icons/pi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="overflow-auto bg-primaryBg">
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0`}
        aria-label="SideBar"
      >
        <div className="h-full px-3 py-4  overflow-y-auto bg-primaryBg">
          <div className=" ">
            <NavLink
              //  onClick={handleMenuItemClick}
              to="/superAdmin/dashboard"
              className="flex items-center flex-shrink-0 text-xl text-gray-800 dark:text-gray-200 my-2"
            >
              <img src={"/logo.jpeg"} className="mr-5 sm:w-30" alt="Logo" />
            </NavLink>
          </div>
          <ul className="mt-8 font-medium">
            <NavLink to={"/sp/dashboard/sahome"}>
              <li>
                <button
                  type="button"
                  className="px-5 mb-2 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-blue-900 hover:text-white hover:shadow-md dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                >
                  <TiHomeOutline size={20} />

                  <span className="flex-1 ml-3 text-left text-lg whitespace-nowrap">
                    Dashboard
                  </span>
                </button>
              </li>
            </NavLink>

            <NavLink to={"/sp/dashboard/sachapters"}>
              <li>
                <button
                  type="button"
                  className="px-5 mb-2 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-blue-900 hover:text-white hover:shadow-md dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                >
                  <BiBookContent size={20} />

                  <span className="flex-1 ml-3 text-left text-lg whitespace-nowrap">
                    Chapters
                  </span>
                </button>
              </li>
            </NavLink>

            <NavLink to={"/sp/dashboard/sachaptermanagers"}>
              <li>
                <button
                  type="button"
                  className="px-5 mb-2 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-blue-900 hover:text-white hover:shadow-md dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                >
                  <TbUsers size={20} />

                  <span className="flex-1 ml-3 text-left text-lg whitespace-nowrap">
                    Chapter Manager
                  </span>
                </button>
              </li>
            </NavLink>

            <NavLink to={"/sp/dashboard/sarequests"}>
              <li>
                <button
                  type="button"
                  className="px-5 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-blue-900 hover:text-white hover:shadow-md dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                >
                  <PiTelegramLogo size={20} />

                  <span className="flex-1 ml-3 text-left text-lg whitespace-nowrap">
                    Request
                  </span>
                </button>
              </li>
            </NavLink>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
