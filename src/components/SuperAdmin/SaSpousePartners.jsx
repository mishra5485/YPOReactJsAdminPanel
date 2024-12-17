import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AccessLevel, Status } from "../../commonfunctions/Enums";
import Select from "react-select";

import { MdDeleteForever, MdRemoveRedEye, MdAdd } from "react-icons/md";
import { FaArrowUpRightFromSquare, FaDownload } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { statusStyles } from "../../commonfunctions/getStatusStyles";
import getLoginData from "../../commonfunctions/getLoginData";

const SaSpousePartners = () => {
  const loggedInUserData = getLoginData();

  const [records, setrecords] = useState([]);
  const [filteredData, setFilteredData] = useState(records);

  const [chaptersData, setChaptersData] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [member_id, setMember_id] = useState("");
  const [username, setUsername] = useState("");
  const [titleName, setTitleName] = useState("");
  const [userRole, setUserRole] = useState();
  const [selectedChapter, setSelectedChapter] = useState([]);

  const [userDeleteId, setUserDeleteId] = useState("");
  const [updateModalUser_id, setUpdateModalUser_id] = useState("");
  const [updateModalUsername, setUpdateModalUsername] = useState("");
  const [updateModalMember_id, setUpdateModalMember_id] = useState("");
  const [updateModalRole, setUpdateModalRole] = useState("");
  const [updateModalTitleName, setUpdateModalTitleName] = useState("");
  const [updateModalChapter, setUpdateModalChapter] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [isCreateUserModalOpen, SetIsCreateUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, SetIsUpdateUserModalOpen] = useState(false);
  const [isDeleteModalOpen, SetIsDeleteModalOen] = useState(false);

  useEffect(() => {
    const filteredItems = records.filter(
      (item) =>
        item.userName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.member_id.includes(searchText)
    );

    setFilteredData(filteredItems);
  }, [records, searchText]);

  useEffect(() => {
    getAllSpousePartners();
    getAllDropdownChapters();
  }, []);

  const getAllSpousePartners = async () => {
    toast.dismiss();
    try {
      setisLoading(true);
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/getAllSpousePartners`
      );

      const responseData = response.data.data;
      const responseStatus = response.status;
      const responseMessage = response.data.message;

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

  const getAllDropdownChapters = async () => {
    toast.dismiss();
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/chapter/getall`
      );

      const responseData = response.data.data;
      const responseStatus = response.status;
      const responseMessage = response.data.message;

      if (responseStatus == 200) {
        setChaptersData(responseData);
      }
    } catch (error) {
      const errorResponseMessage = error.response.data.message;
      const responseStatus = error.response.status;
      console.log(error);
      setChaptersData([]);
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

  const handleDelete = async () => {
    toast.dismiss();

    try {
      const payloadData = {
        user_id: userDeleteId,
      };

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/deletebyId`,
        payloadData
      );

      const responseMessage = response.data.message;

      SetIsDeleteModalOen(false);
      setUserDeleteId("");
      getAllSpousePartners();
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

  const handleUserCreationSubmit = async (e) => {
    e.preventDefault();

    if (!member_id || !username || !userRole) {
      toast.error(`Please Fill all feilds`, {
        style: {
          background: "black",
          color: "white",
        },
      });
      return;
    }

    if (userRole == AccessLevel.Others || userRole == AccessLevel.SuperAdmin) {
      if (!titleName) {
        toast.error(`Please provide title name`, {
          style: {
            background: "black",
            color: "white",
          },
        });
        return;
      }
    }

    if (userRole != AccessLevel.SuperAdmin && userRole != AccessLevel.Others) {
      if (selectedChapter.length == 0) {
        toast.error(`Please select chapter(s)`, {
          style: {
            background: "black",
            color: "white",
          },
        });
        return;
      }
    }

    let updatedChaptersArray;
    if (selectedChapter) {
      updatedChaptersArray = selectedChapter.map((chapter) => {
        return {
          chapter_id: chapter.value,
        };
      });
    }

    const payload = {
      member_id: member_id,
      accessLevel: userRole,
      userName: username,
    };

    if (userRole == AccessLevel.Others || userRole == AccessLevel.SuperAdmin) {
      payload.Alias = titleName;
    }

    if (updatedChaptersArray.length > 0) {
      payload.Chapters = updatedChaptersArray;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/create`,
        payload
      );
      const responseMessage = response.data.message;

      toast.success(responseMessage || "User Created Successfully", {
        style: { background: "green", color: "white" },
      });
      setMember_id("");
      setUsername("");
      setUserRole(null);
      setSelectedChapter([]);

      getAllSpousePartners();
      SetIsCreateUserModalOpen(false);
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

  const handleUserUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!updateModalUser_id) {
      toast.error(`Please Fill all feilds`, {
        style: {
          background: "black",
          color: "white",
        },
      });
      return;
    }

    const payload = {
      user_id: updateModalUser_id,
      userName: updateModalUsername,
      accessLevel: updateModalRole,
      Alias: updateModalTitleName,
      Chapters: updateModalChapter,
      loggedInUser_Id: loggedInUserData.user_id,
      loggedInUser_Role: loggedInUserData.Role,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/upadtebyId`,
        payload
      );
      const responseMessage = response.data.message;

      toast.success(responseMessage || "User Updated Successfully", {
        style: { background: "green", color: "white" },
      });
      setUpdateModalUser_id("");
      setUpdateModalUsername("");
      setUpdateModalMember_id("");
      setUpdateModalRole("");
      setUpdateModalTitleName("");
      setUpdateModalChapter([]);
      getAllSpousePartners();
      SetIsUpdateUserModalOpen(false);
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

  const downloadExcelUserData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/downloadUserData`,
        {},
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "YpoSouthAsiaUsers.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);

      const errorResponseMessage =
        error.response?.data?.message || "Unknown error";
      const responseStatus = error.response?.status || "No status";

      toast.error(`${errorResponseMessage}`, {
        style: {
          background: "black",
          color: "white",
        },
      });

      throw new Error(`API Error: Status ${responseStatus}`);
    }
  };

  const downlaodUserCard = async (user_id) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/user/downloadcard/${user_id}`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `UserCard_${user_id}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);

      const errorResponseMessage =
        error.response?.data?.message || "Unknown error";
      const responseStatus = error.response?.status || "No status";

      toast.error(`${errorResponseMessage}`, {
        style: {
          background: "black",
          color: "white",
        },
      });

      throw new Error(`API Error: Status ${responseStatus}`);
    }
  };

  const dropdownStyles = {
    control: (styles) => ({ ...styles, marginBottom: "1rem" }),
    menuList: (styles) => ({
      ...styles,
      maxHeight: "170px",
      overflowY: "auto",
      textAlign: "left",
    }),
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
            <div className="bg-white w-full p-3 rounded-md shadow-md min-h-screen">
              <div className="mt-10 border-b border-gray-100 h-100vh">
                <div className="flex md:flex-row flex-col gap-4 md:gap-0 my-5 justify-between">
                  <div>
                    <h5 className="md:text-2xl text-xl font-bold mt-2 px-2 py-1 text-left">
                      Manage Spouse/Partners
                    </h5>
                  </div>

                  <div className="flex md:justify-center md:items-center gap-4">
                    <input
                      type="text"
                      placeholder="Search Username"
                      value={searchText}
                      onChange={handleSearch}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-800"
                    />
                    <button
                      onClick={() => SetIsCreateUserModalOpen(true)}
                      className="block text-white p-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      <MdAdd size={20} />
                    </button>

                    <button
                      onClick={() => downloadExcelUserData()}
                      className="block text-white p-3  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      <IoMdDownload size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-base">
                        MemberId
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Chapter
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-base">
                        Card
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
                          <td className="px-6 py-4 text-gray-800 text-base">
                            {elem.member_id}
                          </td>
                          <td className="px-6 py-4 text-gray-800 text-base">
                            <span className="bg-blue-800 px-4 py-1 border rounded-xl text-white whitespace-nowrap">
                              Spouse/Partner
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-800 text-base">
                            {elem.userName}
                          </td>

                          <td className="px-6 py-4 text-gray-800 text-base">
                            {elem?.updatedChapterArrayWithNames?.map(
                              (chapter, index) => (
                                <p key={index}>{chapter.ChapterName},</p>
                              )
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 text-white font-semibold rounded-full ${
                                statusStyles[elem.status]?.color ||
                                "bg-gray-500"
                              }`}
                            >
                              {statusStyles[elem.status]?.text || "Unknown"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-4">
                              <a
                                href={`${
                                  import.meta.env.VITE_REACT_APP_BASE_URL
                                }/user/rndcard/${elem._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md flex items-center justify-center ${
                                  elem.status == 3
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                style={{
                                  pointerEvents:
                                    elem.status == 3 ? "none" : "auto",
                                }}
                              >
                                <FaArrowUpRightFromSquare size={14} />
                              </a>

                              <button
                                onClick={() => downlaodUserCard(elem._id)}
                                className={`bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md flex items-center justify-center ${
                                  elem.status == 3
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                disabled={elem.status == 3}
                              >
                                <FaDownload size={16} />
                              </button>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div>
                              <button
                                onClick={() => {
                                  SetIsDeleteModalOen(true),
                                    setUserDeleteId(elem._id);
                                }}
                                className="text-red-500 hover:text-red-700 "
                              >
                                <MdDeleteForever size={28} />
                              </button>
                              <button
                                onClick={() => {
                                  SetIsUpdateUserModalOpen(true),
                                    setUpdateModalUser_id(elem._id);
                                  setUpdateModalUsername(elem.userName);
                                  setUpdateModalMember_id(elem.member_id);
                                  setUpdateModalRole(elem.accessLevel);
                                  setUpdateModalTitleName(elem.Alias);
                                  setUpdateModalChapter(elem.Chapters);
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

            {isCreateUserModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div
                  id="popup-modal"
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <form
                        onSubmit={handleUserCreationSubmit}
                        className="p-4 md:p-5 text-center"
                      >
                        <h3 className="mb-5 text-lg font-bold text-xl text-gray-500 dark:text-gray-400">
                          Create User
                        </h3>

                        {/* Member Id Input */}
                        <div className="mb-4">
                          <label
                            htmlFor="memeber_id"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Member Id*
                          </label>
                          <input
                            type="text"
                            id="memeber_id"
                            value={member_id}
                            onChange={(e) => setMember_id(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter Member Id"
                            required
                          />
                        </div>

                        {/* Name Input */}
                        <div className="mb-4">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Name*
                          </label>
                          <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter Name"
                            required
                          />
                        </div>

                        {/* User Role */}
                        <div className="mb-4">
                          <label
                            htmlFor="userRole"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Role*
                          </label>
                          <select
                            className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                            onChange={(e) => {
                              setUserRole(e.target.value);
                            }}
                            defaultValue="select_role"
                            value={userRole}
                          >
                            <option value="select_role" disabled>
                              Select Role
                            </option>
                            <option value="1">SuperAdmin</option>
                            <option value="2">Member</option>
                            <option value="3">Spouse/Partner</option>
                            <option value="4">Chapter Manager</option>
                            <option value="5">Others</option>
                          </select>
                        </div>

                        {/* Title Name */}
                        {userRole == AccessLevel.Others ||
                        userRole == AccessLevel.SuperAdmin ? (
                          <div className="mb-4">
                            <label
                              htmlFor="titlename"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                            >
                              Title Name
                            </label>
                            <input
                              type="text"
                              id="titlename"
                              value={titleName}
                              onChange={(e) => setTitleName(e.target.value)}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              placeholder="Enter Title Name"
                            />
                          </div>
                        ) : null}

                        {/* Chapters Selection */}
                        <div className="mb-4">
                          <label
                            htmlFor="chapter_select"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Chapter*
                          </label>
                          <Select
                            styles={dropdownStyles}
                            options={chaptersData.map((data) => ({
                              value: data._id,
                              label: data.chapter_Name,
                            }))}
                            value={selectedChapter}
                            onChange={setSelectedChapter}
                            placeholder="Select Chapter"
                            isClearable
                            isMulti
                          />
                        </div>

                        {/* Buttons */}
                        <button
                          type="button"
                          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          onClick={() => SetIsCreateUserModalOpen(false)}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Create
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isUpdateUserModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div
                  id="popup-modal"
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <form
                        onSubmit={handleUserUpdateSubmit}
                        className="p-4 md:p-5 text-center"
                      >
                        <h3 className="mb-5 text-lg font-bold text-xl text-gray-500 dark:text-gray-400">
                          Update User
                        </h3>

                        {/* Member Id Input */}
                        <div className="mb-4">
                          <label
                            htmlFor="update_memeber_id"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Member Id
                          </label>
                          <input
                            type="text"
                            id="update_memeber_id"
                            value={updateModalMember_id}
                            onChange={(e) =>
                              setUpdateModalMember_id(e.target.value)
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter Member Id"
                            disabled
                          />
                        </div>

                        {/* Name Input */}
                        <div className="mb-4">
                          <label
                            htmlFor="modalusername"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="modalusername"
                            value={updateModalUsername}
                            onChange={(e) =>
                              setUpdateModalUsername(e.target.value)
                            }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter Name"
                            required
                          />
                        </div>

                        {/* User Role */}
                        <div className="mb-4">
                          <label
                            htmlFor="userRole"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Role*
                          </label>
                          <select
                            className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-1"
                            onChange={(e) => {
                              setUpdateModalRole(e.target.value);
                            }}
                            defaultValue="select_role"
                            value={updateModalRole}
                          >
                            <option value="select_role" disabled>
                              Select Role
                            </option>
                            <option value="1">SuperAdmin</option>
                            <option value="2">Member</option>
                            <option value="3">Spouse/Partner</option>
                            <option value="4">Chapter Manager</option>
                            <option value="5">Others</option>
                          </select>
                        </div>

                        {/* Title Name */}
                        {updateModalRole == AccessLevel.Others ||
                        updateModalRole == AccessLevel.SuperAdmin ? (
                          <div className="mb-4">
                            <label
                              htmlFor="titlename"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                            >
                              Title Name
                            </label>
                            <input
                              type="text"
                              id="titlename"
                              value={updateModalTitleName}
                              onChange={(e) =>
                                setUpdateModalTitleName(e.target.value)
                              }
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                              placeholder="Enter Title Name"
                            />
                          </div>
                        ) : null}

                        {/* Chapters Selection */}
                        <div className="mb-4">
                          <label
                            htmlFor="chapter_select"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 text-left"
                          >
                            Chapter*
                          </label>
                          <Select
                            styles={dropdownStyles}
                            options={chaptersData.map((data) => ({
                              value: data._id,
                              label: data.chapter_Name,
                              isSelected: updateModalChapter.some(
                                (assigned) => assigned.chapter_id === data._id
                              ),
                            }))}
                            value={chaptersData
                              .filter((data) =>
                                updateModalChapter.some(
                                  (assigned) => assigned.chapter_id === data._id
                                )
                              )
                              .map((data) => ({
                                value: data._id,
                                label: data.chapter_Name,
                              }))}
                            onChange={(selectedOptions) => {
                              setUpdateModalChapter(
                                selectedOptions
                                  ? selectedOptions.map((option) => ({
                                      chapter_id: option.value,
                                    }))
                                  : []
                              );
                            }}
                            placeholder="Select Chapter"
                            isClearable
                            isMulti
                          />
                        </div>

                        {/* Buttons */}
                        <button
                          type="button"
                          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          onClick={() => SetIsUpdateUserModalOpen(false)}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isDeleteModalOpen && (
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
                          SetIsDeleteModalOen(false), setUserDeleteId("");
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
                          Are you sure you want to delete this User?
                        </h3>
                        <button
                          onClick={() => handleDelete()}
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          Yes,
                        </button>
                        <button
                          onClick={() => {
                            SetIsDeleteModalOen(false), setUserDeleteId("");
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

export default SaSpousePartners;
