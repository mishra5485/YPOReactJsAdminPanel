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
  // const userData = useSelector((state) => state.auth.userData);

  const [records, setrecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(records);
  const [isLoading, setisLoading] = useState(false);

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
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">
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
          </>
        )}
      </div>
    </>
  );
};

export default SaDashboardDetails;
