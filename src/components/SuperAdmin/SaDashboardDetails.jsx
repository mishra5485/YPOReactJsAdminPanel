import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";

const SaDashboardDetails = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4 mt-10">
      {/* Regional Management Card */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white"/>
        </div>
        <div className="text-lg font-semibold mb-2">Regional Management</div>
        <div className="text-2xl font-bold">9</div>
      </div>

      {/* Members Card */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white" />
        </div>
        <div className="text-lg font-semibold mb-2">Members</div>
        <div className="text-2xl font-bold">2173</div>
      </div>

      {/* Spouse/Partners Card */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white" />
        </div>
        <div className="text-lg font-semibold mb-2">Spouse/Partners</div>
        <div className="text-2xl font-bold">1830</div>
      </div>

      {/* Chapters Card */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white" />
        </div>
        <div className="text-lg font-semibold mb-2">Chapters</div>
        <div className="text-2xl font-bold">28</div>
      </div>

      {/* Chapter Managers Card */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-blue-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <IoBagAdd size={32} color="white" />
        </div>
        <div className="text-lg font-semibold mb-2">Chapter Managers</div>
        <div className="text-2xl font-bold">45</div>
      </div>

      {/* Pending Approval Card */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
          <FaUsers size={32} color="white"/>
        </div>
        <div className="text-lg font-semibold mb-2">Pending Approval</div>
        <div className="text-2xl font-bold">2</div>
      </div>
    </div>
  );
};

export default SaDashboardDetails;
