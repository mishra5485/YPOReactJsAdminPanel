import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import getLoginData from "../../commonfunctions/getLoginData";

const CpDashboardDetails = () => {
  const LoginData = getLoginData();


  const [dashboardData, setDashboardData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getChapterManagerDashboardData();
  }, []);

  const getChapterManagerDashboardData = async () => {
    toast.dismiss();
    try {
      setisLoading(true);
      let response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/user/getChapterManagerDashBoardData`,
        {
          chapter_manager_id:LoginData.user_id
        }
      );

      const responseData = response.data.data;
      setDashboardData(responseData);
      setisLoading(false);
    } catch (error) {
      const errorResponseMessage = error.response.data.message;
      const responseStatus = error.response.status;
      console.log(error);
      setrecords([]);
      setisLoading(false);
      if (error.response) {
        if (
          responseStatus == 404 ||
          responseStatus == 403 ||
          responseStatus == 500 ||
          responseStatus == 302 ||
          responseStatus == 409 ||
          responseStatus == 401 ||
          responseStatus == 400
        ) {
          toast.error(`${errorResponseMessage}`, {
            style: {
              background: "black",
              color: "white",
            },
          });
          throw new Error(`API Error: Status ${responseStatus}`);
        }
      }
    }
  };

  return (
    <>
      <Toaster />
      {console.log("isLoading=====>", isLoading)}
      <div>
        {isLoading ? (
          <div className="flex justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 mt-10">
            {/* Regional Management Card */}
            <Link to="/sp/dashboard/saadminstable">
              <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
                <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
                  <FaUsers size={32} color="white" />
                </div>
                <div className="text-lg font-semibold mb-2">
                  Regional Management
                </div>
                <div className="text-2xl font-bold">
                  {dashboardData.superAdminsDatalength}
                </div>
              </div>
            </Link>

            {/* Members Card */}
            <Link to="/sp/dashboard/samembers">
              <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
                <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
                  <FaUsers size={32} color="white" />
                </div>
                <div className="text-lg font-semibold mb-2">Members</div>
                <div className="text-2xl font-bold">
                  {dashboardData.membersDatalength}
                </div>
              </div>
            </Link>

            {/* Spouse/Partners Card */}
            <Link to="/sp/dashboard/saspousepartners">
              <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
                <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
                  <FaUsers size={32} color="white" />
                </div>
                <div className="text-lg font-semibold mb-2">
                  Spouse/Partners
                </div>
                <div className="text-2xl font-bold">
                  {dashboardData.spousePartnersDatalength}
                </div>
              </div>
            </Link>

            {/* Chapters Card */}
            <Link to="/sp/dashboard/sachapters">
              <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
                <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
                  <FaUsers size={32} color="white" />
                </div>
                <div className="text-lg font-semibold mb-2">Chapters</div>
                <div className="text-2xl font-bold">
                  {dashboardData.allChaptersDatalength}
                </div>
              </div>
            </Link>

            {/* Chapter Managers Card */}
            <Link to="/sp/dashboard/sachaptermanagers">
              <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
                <div className="mb-4 bg-blue-500 p-3 border border-gray-200 rounded-xl shadow-md">
                  <IoBagAdd size={32} color="white" />
                </div>
                <div className="text-lg font-semibold mb-2">
                  Chapter Managers
                </div>
                <div className="text-2xl font-bold">
                  {dashboardData.chapterManagersDatalength}
                </div>
              </div>
            </Link>

            {/* Pending Approval Card */}
            <Link to="/sp/dashboard/sarequests">
              <div className="bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
                <div className="mb-4 bg-amber-500 p-3 border border-gray-200 rounded-xl shadow-md">
                  <FaUsers size={32} color="white" />
                </div>
                <div className="text-lg font-semibold mb-2">
                  Pending Approval
                </div>
                <div className="text-2xl font-bold">2</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CpDashboardDetails;
