import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SaSidebar";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import getLoginData from "../../commonfunctions/getLoginData";


const SaDashboard = () => {
  const LoginData = getLoginData();

  return (
    <div className="h-[100%] ">
      {/* Sidebar remains fixed on the left */}
      <Sidebar />

      {/* Right side displays the nested routes */}
      <div className="p-4 sm:ml-72 h-[100vh]">
        <div className="w-full flex justify-between items-center mt-4 h-16 px-4 pt-4 pb-12 border-b-2">
          <div>
            <h1 className="text-3xl font-bold ">{`Welcome Back,${LoginData.Username}`}</h1>
            
          </div>
          <Link to="/sp/dashboard/saprofile">
          <div className="p-4 border rounded-full shadow-md">
          <FaUser size={28}/>
          </div>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SaDashboard;
