import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Status } from "../../commonfunctions/Enums";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import getLoginData from "../../commonfunctions/getLoginData";
import { statusStyles } from "../../commonfunctions/getStatusStyles";

const CpChapters = () => {
  const navigate = useNavigate();
  const LoginData = getLoginData();

  const [records, setrecords] = useState([]);
  const [filteredData, setFilteredData] = useState(records);

  const [searchText, setSearchText] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const filteredItems = records.filter((item) =>
      item.chapter_Name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(filteredItems);
  }, [records, searchText]);

  useEffect(() => {
    getAssignedChapters();
  }, []);

  const getAssignedChapters = async () => {
    toast.dismiss();
    try {
      setisLoading(true);
      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/chapter/getManagerChapters`,
        {
          chapter_manager_id: LoginData.user_id,
        }
      );

      const responseData = response.data.data;
      const responseStatus = response.status;

      if (responseStatus == 200) {
        setrecords(responseData);
        setisLoading(false);
      }
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
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
            <div className="bg-white w-full p-3 mx-auto rounded-md shadow-md min-h-screen">
              <div className="mt-10 border-b border-gray-100 h-100vh">
                <div
                  className="flex justify-around my-5"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5 className="text-2xl font-bold mt-2 px-2 py-1 text-left">
                    Chapters
                  </h5>
                  <div className="flex justify-ceter">
                    <input
                      type="text"
                      placeholder="Search Chapter Name"
                      value={searchText}
                      onChange={handleSearch}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-800"
                    />
                  </div>
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
                        Chapter Logo
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Chapter Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Region
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Operations
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
                            {
                              <div className="flex justify-start items-start">
                                <img
                                  src={`${
                                    import.meta.env.VITE_REACT_APP_BASE_URL
                                  }/${elem.chapter_Logo}`}
                                  alt={elem.chapter_Name}
                                  className="w-14 h-14 rounded-full object-cover bg-blue-900"
                                />
                              </div>
                            }
                          </th>
                          <td className="px-6 py-4 text-gray-800 text-base">
                            <button
                              onClick={() => {
                                navigate(
                                  `/cp/dashboard/cpchapterusers/${elem._id}`
                                );
                              }}
                            >
                              {elem.chapter_Name}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            {
                               <span
                               className={`inline-block px-3 py-1 text-white font-semibold rounded-full ${
                                 statusStyles[elem.status]?.color ||
                                 "bg-gray-500"
                               }`}
                             >
                               {statusStyles[elem.status]?.text || "Unknown"}
                             </span>
                            }
                          </td>
                          <td className="px-6 py-4 text-gray-800 text-base">
                            {elem.chapter_Region}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <button
                                onClick={() => {
                                  navigate(
                                    `/cp/dashboard/cpchapterusers/${elem._id}`
                                  );
                                }}
                                className="text-blue-500 hover:text-blue-700 px-3"
                              >
                                <MdRemoveRedEye size={28} />
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
          </>
        )}
      </div>
    </>
  );
};

export default CpChapters;
