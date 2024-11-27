import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="h-[100%]">
      {/* Sidebar remains fixed on the left */}
      <Sidebar />

      {/* Right side displays the nested routes */}
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
