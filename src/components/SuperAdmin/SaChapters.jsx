import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { AgencyRegistration } from "../../schemas";
import { useSelector } from "react-redux";
import getToken from "../../commonfunctions/getToken";

const initialValues = {
  Agency_Name: "",
  Contact_Person: "",
  Contact_Number: "",
};

const SaChapters = () => {
  const userData = useSelector((state) => state.auth.userData);

  const [records, setrecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(records);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const filteredItems = records.filter((item) =>
      item.agency_name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(filteredItems);
  }, [records, searchText]);

  useEffect(() => {
    getAllAgencies();
  }, []);

  const getAllAgencies = async () => {
    try {
      const token = getToken();
      setisLoading(true);
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/agency/getAll`,
        token
      );
      if (response.status === 200) {
        setrecords(response.data);
        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      if (error.response) {
        const { status, data } = error.response;
        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          toast.error(data, {
            style: {
              background: "black",
              color: "white",
            },
          });
          throw new Error(`API Error: Status ${status}`);
        }
      }
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const columns = [
    {
      name: "Agency Name",
      selector: (row) => row.agency_name,
      sortable: true,
    },
    {
      name: "Contact Name",
      selector: (row) => row.contact_person,
    },

    {
      name: "Contact Number",
      selector: (row) => row.contact_number,
    },
  ];

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: AgencyRegistration,
      onSubmit: async (values, action) => {
        const payloadData = {
          Agency_Name: values.Agency_Name,
          Contact_Person: values.Contact_Person,
          Contact_Number: values.Contact_Number,
          CreatedBy: userData.userName,
        };
        try {
          const token = getToken();
          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/agency/register`,
            payloadData,
            token
          );
          if (response.status === 200) {
            action.resetForm();
            getAllAgencies();
          }
        } catch (error) {
          console.log(error);
          if (error.response) {
            const { status, data } = error.response;
            if (
              status === 404 ||
              status === 403 ||
              status === 500 ||
              status === 302 ||
              status === 409 ||
              status === 401 ||
              status === 400
            ) {
              toast.error(data, {
                style: {
                  background: "black",
                  color: "white",
                },
              });
              throw new Error(`API Error: Status ${status}`);
            }
          }
        }
      },
    });

  return (
    <>
      <Toaster />
      <div className="my-8">
        <section className="w-full p-6 mx-auto bg-white rounded-md shadow-md max-w-4xl">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4 text-2xl font-bold">Agency Registration</h2>
            <div className="flex flex-col mb-4">
              <label htmlFor="Agency_Name" className="mb-2 font-bold">
                Agency Name
              </label>
              <input
                type="text"
                autoComplete="off"
                name="Agency_Name"
                id="Agency_Name"
                placeholder="Please enter Agency Name"
                value={values.Agency_Name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.Agency_Name && touched.Agency_Name ? (
                <p className="text-red-600">{errors.Agency_Name}</p>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="Contact_Person" className="mb-2 font-bold">
                Contact Person
              </label>
              <input
                type="text"
                autoComplete="off"
                name="Contact_Person"
                id="Contact_Person"
                placeholder="Please enter Contact Person"
                value={values.Contact_Person}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.Contact_Person && touched.Contact_Person ? (
                <p className="text-red-600">{errors.Contact_Person}</p>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="Contact_Number" className="mb-2 font-bold">
                Contact Number
              </label>
              <input
                type="number"
                autoComplete="off"
                name="Contact_Number"
                id="Contact_Number"
                placeholder="Please enter your Contact Number"
                value={values.Contact_Number}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.Contact_Number && touched.Contact_Number ? (
                <p className="text-red-600">{errors.Contact_Number}</p>
              ) : null}
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-sky-400 rounded-md hover:bg-sky-700 focus:outline-none focus:bg-gray-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
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
          <div className="bg-white  w-full p-3 mx-auto rounded-md shadow-md max-w-4xl mt-5">
            <div className="p-4 bg-gray-300 border-b border-gray-100">
              <div
                className="flex justify-around"
                style={{ justifyContent: "space-between" }}
              >
                <h5 className="text-lg font-bold mt-2 px-2 py-1 text-left">
                  Agency Information
                </h5>
                <input
                  type="text"
                  placeholder="Search Agency Name"
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
                paginationRowsPerPageOptions={[50, 100, 150]}
                striped
                highlightonhover
                noDataComponent="No Spot_Billers Found"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SaChapters;
