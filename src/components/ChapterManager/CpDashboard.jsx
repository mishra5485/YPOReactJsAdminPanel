import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./CpSidebar";

const SuperAdminDashBoard = () => {
  return (
    <div className="h-[100%] ">
      {/* Sidebar remains fixed on the left */}
      <Sidebar />

      {/* Right side displays the nested routes */}
      <div className="p-4 sm:ml-72 bg-primaryBg">
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminDashBoard;
