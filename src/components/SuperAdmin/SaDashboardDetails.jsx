import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

const SaDashboardDetails = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 mt-10">
      {/* Regional Management Card */}
      <Link to="/sp/dashboard/saadminstable">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white"/>
        </div>
        <div className="text-lg font-semibold mb-2">Regional Management</div>
        <div className="text-2xl font-bold">9</div>
      </div>
      </Link>
    

      {/* Members Card */}
      <Link to="/sp/dashboard/samembers">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white" />
        </div>
        <div className="text-lg font-semibold mb-2">Members</div>
        <div className="text-2xl font-bold">2173</div>
      </div>
      </Link>

      {/* Spouse/Partners Card */}
      <Link to="/sp/dashboard/saspousepartners">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white" />
        </div>
        <div className="text-lg font-semibold mb-2">Spouse/Partners</div>
        <div className="text-2xl font-bold">1830</div>
      </div>
      </Link>

      {/* Chapters Card */}
      <Link to="/sp/dashboard/sachapters">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white" />
        </div>
        <div className="text-lg font-semibold mb-2">Chapters</div>
        <div className="text-2xl font-bold">28</div>
      </div>
      </Link>

      {/* Chapter Managers Card */}
      <Link to="/sp/dashboard/sachaptermanagers">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-blue-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <IoBagAdd size={32} color="white" />
        </div>
        <div className="text-lg font-semibold mb-2">Chapter Managers</div>
        <div className="text-2xl font-bold">45</div>
      </div>
      </Link>

      {/* Pending Approval Card */}
      <Link to="/sp/dashboard/sarequests">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white"/>
        </div>
        <div className="text-lg font-semibold mb-2">Pending Approval</div>
        <div className="text-2xl font-bold">2</div>
      </div>
      </Link>
    </div>
  );
};

export default SaDashboardDetails;
