import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import getLoginData from "../../commonfunctions/getLoginData";
import { MdDone } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const SaRequests = () => {
  const LoginData = getLoginData();

  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [userId, setUserId] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [isApproveModelOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  useEffect(() => {
    getAllRequests();
  }, []);

  const getAllRequests = async () => {
    toast.dismiss();
    try {
      setisLoading(true);
      let response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/user/getAllUnderApprovalUsersData`,
        {
          superAdmin_id: LoginData.user_id,
        }
      );

      const responseData = response.data.data;
      const responseStatus = response.status;

      if (responseStatus == 200) {
        setFilteredData(responseData);
        setisLoading(false);
      }
    } catch (error) {
      const errorResponseMessage = error.response.data.message;
      const responseStatus = error.response.status;
      console.log(error);
      setFilteredData([]);
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

  const handleApproveRequest = async () => {
    toast.dismiss();

    try {
      const payloadData = {
        user_id: userId,
        superAdmin_id:LoginData.user_id
      };

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/acceptApproval`,
        payloadData
      );

      const responseMessage = response.data.message;

      setIsApproveModalOpen(false);
      setUserId("");
      getAllRequests();
      toast.success(`${responseMessage}`, {
        style: { background: "green", color: "white" },
      });
    } catch (error) {
      const errorResponseMessage = error.response.data.message;
      if (errorResponseMessage) {
        toast.error(errorResponseMessage || "Something went wrong!", {
          style: { background: "black", color: "white" },
        });
      } else {
        toast.error("Network error. Please try again.", {
          style: { background: "black", color: "white" },
        });
      }
    }
  };

  const handleRejectRequest = async () => {
    toast.dismiss();

    try {
      const payloadData = {
        user_id: userId,
        superAdmin_id:LoginData.user_id
      };

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/rejectApproval`,
        payloadData
      );

      const responseMessage = response.data.message;

      setIsRejectModalOpen(false);
      setUserId("");
      getAllRequests();
      toast.success(`${responseMessage}`, {
        style: { background: "green", color: "white" },
      });
    } catch (error) {
      const errorResponseMessage = error.response.data.message;
      if (errorResponseMessage) {
        toast.error(errorResponseMessage || "Something went wrong!", {
          style: { background: "black", color: "white" },
        });
      } else {
        toast.error("Network error. Please try again.", {
          style: { background: "black", color: "white" },
        });
      }
    }
  };

  return (
    <>
      <Toaster />
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
          <>
            <div className="bg-white w-full mx-auto rounded-md shadow-md min-h-screen">
              <div className="mt-10 border-b border-gray-100 h-100vh">
                <div
                  className="flex mb-5"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5 className="text-2xl font-bold mt-2 px-2 py-1 text-left">
                    Manage Requests
                  </h5>
                </div>
              </div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-8 text-base">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Operation
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Member Id
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Username
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Chapter
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length == 0 ? (
                      <tr>
                        <td
                          className="font-bold text-2xl text-center py-8"
                          colSpan={7}
                        >
                          <p>No Records Found</p>
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((elem, index) => (
                        <tr
                          className=" border-b dark:border-gray-700"
                          key={index}
                        >
                          <td className="px-6 py-4 font-bold text-base">
                            {index + 1}
                          </td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <span
                              className={`inline-block px-3 py-1 text-white font-semibold rounded-full ${
                                elem.Action == "Create"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {elem.Action}
                            </span>
                          </th>
                          <td className="px-6 py-4 text-gray-800 text-base">
                            {elem.member_id}
                          </td>
                          <td className="px-6 py-4 text-gray-800 text-base">
                            {elem.userName}
                          </td>
                          <td className="px-6 py-4 text-gray-800 text-base">
                            {elem.Role}
                          </td>
                          <td className="px-6 py-4 text-gray-800 text-base">
                            {elem?.Chapters?.map((chapter, index) => (
                              <p key={index}>{chapter.ChapterName},</p>
                            ))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <button
                                onClick={() => {
                                  setIsApproveModalOpen(true),
                                    setUserId(elem._id);
                                }}
                                className="text-red-500 hover:text-red-700 "
                              >
                                <MdDone size={28} />
                              </button>
                              <button
                                onClick={() => {
                                  setIsRejectModalOpen(true),
                                  setUserId(elem._id);
                                }}
                                className="text-blue-500 hover:text-blue-700 px-3"
                              >
                                <IoCloseSharp size={28} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {isApproveModelOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div
                  id="popup-modal"
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* Close button */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsApproveModalOpen(false), setUserId("");
                        }}
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>

                      {/* Modal content */}
                      <div className="p-4 md:p-5 text-center">
                        <svg
                          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to Approve this Request?
                        </h3>
                        <button
                          onClick={() => handleApproveRequest()}
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          Yes,
                        </button>
                        <button
                          onClick={() => {
                            setIsApproveModalOpen(false),
                              setUserId("");
                          }}
                          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          No, cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isRejectModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div
                  id="popup-modal"
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* Close button */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsRejectModalOpen(false), setUserId("");
                        }}
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>

                      {/* Modal content */}
                      <div className="p-4 md:p-5 text-center">
                        <svg
                          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to Reject this Request?
                        </h3>
                        <button
                          onClick={() => handleRejectRequest()}
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          Yes,
                        </button>
                        <button
                          onClick={() => {
                            setIsRejectModalOpen(false),
                              setUserId("");
                          }}
                          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          No, cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SaRequests;
