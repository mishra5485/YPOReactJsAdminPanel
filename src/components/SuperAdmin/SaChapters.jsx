import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { AgencyRegistration } from "../../schemas";
import getToken from "../../commonfunctions/getToken";
import { Status } from "../../commonfunctions/Enums";
import { MdDeleteForever } from "react-icons/md";
import { MdAdd } from "react-icons/md";

const SaDashboardDetails = () => {
  const [records, setrecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(records);
  const [isLoading, setisLoading] = useState(false);

  const [chapterName, setChapterName] = useState("");
  const [chaperLogo, setChapterLogo] = useState();

  const [isCreateChapterModalOpen, SetIsCreateChapterModalOpen] =
    useState(false);

  const [isDeleteModalOpen, SetIsDeleteModalOen] = useState(false);
 

  useEffect(() => {
    const filteredItems = records.filter((item) =>
      item.chapter_Name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(filteredItems);
  }, [records, searchText]);

  useEffect(() => {
    getAllChapters();
  }, []);

  const getAllChapters = async () => {
    try {
      setisLoading(true);
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/chapter/getall`
      );

      const responseData = response.data.data;
      const responseStatus = response.status;
      const responseMessage = response.data.message;

      if (responseStatus == 200) {
        setrecords(responseData);
        setisLoading(false);
        toast.success(`${responseMessage}`, {
          style: { background: "green", color: "white" },
        });
      }
    } catch (error) {
      const errorResponseMessage = error.response.data.message;
      const responseStatus = error.response.status;
      console.log(error);

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

  const handleDelete = async (chapter_id) => {
    try {
      const payloadData = {
        chapter_id: chapter_id,
      };

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/chapter/deletebyId`,
        payloadData
      );

      const responseStatus = response.status;
      const responseMessage = response.data.message;

      if (responseStatus == 200) {
        getAllChapters();
        toast.success(`${responseMessage}`, {
          style: { background: "green", color: "white" },
        });
      }
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

  const columns = [
    {
      name: "Chapter Logo",
      selector: (row) => row.agency_name,
      sortable: true,
      cell: (row) => (
        <div className="flex justify-center items-center">
          <img
            src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
              row.chapter_Logo
            }`}
            alt={row.chapter_Name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
      ),
    },
    {
      name: "Chapter Name",
      selector: (row) => row.chapter_Name,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`inline-block px-3 py-1 text-white font-semibold rounded-full ${
            row.status == Status.Active ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {row.status == Status.Active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "Region",
      selector: (row) => row.chapter_Region,
    },
    {
      name: "Operations",
      selector: (row) => row.contact_number,
      cell: (row) => (
        <div>
          <button
            onClick={() => handleDelete(row._id)} // Pass the _id to the delete function
            className="text-red-500 hover:text-red-700 "
          >
            <MdDeleteForever size={24} />
          </button>
        </div>
      ),
    },
  ];

  const handleChapterCreationSubmit = async (e) => {
    e.preventDefault();

    if (!chapterName.trim() || !chaperLogo) {
      toast.error(`Please Fill all feilds`, {
        style: {
          background: "black",
          color: "white",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("chapter_Name", chapterName);
    formData.append("ChapterLogoImage", chaperLogo);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/chapter/create`,
        formData
      );

      console.log(response);

      const responseStatus = response.status;
      const responseMessage = response.data.message;

      if (responseStatus == 201) {
        toast.success(responseMessage || "Chapter Created Successfully", {
          style: { background: "green", color: "white" },
        });
        setChapterName("");
        setChapterLogo(null);
        getAllChapters();
        SetIsCreateChapterModalOpen(false);
      }
    } catch (error) {
      const errorResponseMessage = error.response.data.message;
      const responseStatus = error.response.status;
      console.log(error);

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
      <div className="my-8">
        {isLoading ? (
          <div className="flex justify-center my-10">
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white w-full p-3 mx-auto rounded-md shadow-md max-w-7xl mt-5">
              <div className="flex flex-row-reverse">
                <button
                  onClick={() => SetIsCreateChapterModalOpen(true)}
                  className="block text-white my-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  <MdAdd />
                </button>
              </div>
              <div className="p-4 bg-gray-300 border-b border-gray-100 h-100vh">
                <div
                  className="flex justify-around"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5 className="text-lg font-bold mt-2 px-2 py-1 text-left">
                    Chapters
                  </h5>
                  <input
                    type="text"
                    placeholder="Search Chapter Name"
                    value={searchText}
                    onChange={handleSearch}
                    className="mt-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="p-4">
                <DataTable
                  columns={columns}
                  data={filteredData}
                  pagination
                  paginationPerPage={20}
                  paginationRowsPerPageOptions={[10, 15, 25]}
                  striped
                  highlightonhover
                  noDataComponent="No Chapters Found"
                />
              </div>
            </div>

            {isCreateChapterModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div
                  id="popup-modal"
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <form
                        onSubmit={handleChapterCreationSubmit}
                        className="p-4 md:p-5 text-center"
                      >
                        <h3 className="mb-5 text-lg font-bold text-xl text-gray-500 dark:text-gray-400">
                          Create Chapter
                        </h3>

                        {/* Chapter Name Input */}
                        <div className="mb-4">
                          <label
                            htmlFor="chapter-name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Chapter Name*
                          </label>
                          <input
                            type="text"
                            id="chapter-name"
                            value={chapterName}
                            onChange={(e) => setChapterName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter Chapter name"
                            required
                          />
                        </div>

                        {/* Upload Logo Input */}
                        <div className="mb-4">
                          <label
                            htmlFor="upload-logo"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left my-2"
                          >
                            Upload Logo*
                          </label>
                          <input
                            type="file"
                            id="upload-logo"
                            onChange={(e) => setChapterLogo(e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200 dark:hover:file:bg-gray-500"
                            required
                          />
                        </div>

                        {/* Buttons */}
                        <button
                          type="button"
                          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          onClick={() => SetIsCreateChapterModalOpen(false)}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isDeleteModalOpen && (
              <div
                id="popup-modal"
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
              >
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => SetIsDeleteModalOen(true)(false)}
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
                        Are you sure you want to delete this product?
                      </h3>
                      <button
                        onClick={() => SetIsDeleteModalOen(true)(false)}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        onClick={() => SetIsDeleteModalOen(true)(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        No, cancel
                      </button>
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

export default SaDashboardDetails;
