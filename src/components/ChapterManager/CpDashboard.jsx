import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./CpSidebar";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import getLoginData from "../../commonfunctions/getLoginData";

const CpDashboard = () => {
  const LoginData = getLoginData();

  return (
    <div className="h-[100%]">
      <Sidebar />

      <div className="p-4 sm:ml-64 h-[100vh]">
        <div className="w-full flex justify-between items-center mt-4 h-16 px-4 pt-4 pb-12 border-b-2">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              {`Welcome Back, ${LoginData.Username}`}
            </h1>
          </div>
          <Link to="/cp/dashboard/cpprofile">
            <div className="p-3 sm:p-4 border rounded-full shadow-md">
              <FaUser
                size={20} 
                className="sm:size-18 lg:size-6" 
              />
            </div>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default CpDashboard;
