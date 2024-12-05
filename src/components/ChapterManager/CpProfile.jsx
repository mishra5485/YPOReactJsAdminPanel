import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import * as yup from "yup";
import getLoginData from "../../commonfunctions/getLoginData";
import { useNavigate } from "react-router-dom";

const passwordSchema = yup
  .string()
  .min(4, "Must be at least 4 characters")
  .required("Password is required");

const resetPasswordProfileSection = yup.object().shape({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const CpProfile = () => {
  const navigate = useNavigate();


  const loggedInUserData = getLoginData();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    toast.dismiss();
    try {
      setisLoading(true);
      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/getUserbyId`,
        {
          userId: loggedInUserData.user_id,
        }
      );

      const responseData = response.data.data;
      setUserDetails(responseData);
      setisLoading(false);
    } catch (error) {
      const errorResponseMessage = error.response.data.message;
      const responseStatus = error.response.status;
      console.log(error);
      setUserDetails(null);
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

  const togglePasswordVisibility = (field) => {
    if (field == "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field == "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field == "reenter") {
      setShowReEnterPassword(!showReEnterPassword);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    navigate("/");
  };

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: resetPasswordProfileSection,
    onSubmit: async (values) => {
      const payload = {
        user_id: loggedInUserData.user_id,
        CurrentPassword: values.currentPassword,
        NewPassword: values.newPassword,
      };

      try {
        let response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/userChangePassword`,
          payload
        );
        toast.success(response.data.message);
        handleLogout()
        resetForm();
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-4 md:px-10">
      <Toaster />
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
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6 md:p-8">
          {/* User Info Section */}
          <div className="text-center mb-6 border-b-2 p-4 flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 py-2">
                Username:
                <span className="text-blue-600 font-normal">
                  {userDetails.userName}
                </span>
              </h2>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600 py-2">
                Member ID:
                <span className="text-gray-800 font-normal">
                  {userDetails.member_id}
                </span>
              </h3>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Password & Security
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/** Current Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  id="currentPassword"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Current password"
                  className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-gray-300"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showCurrentPassword ? (
                    <RiEyeOffFill size={20} />
                  ) : (
                    <RiEyeFill size={20} />
                  )}
                </span>
              </div>
              {errors.currentPassword && touched.currentPassword && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/** New Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter New password"
                  className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-gray-300"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showNewPassword ? (
                    <RiEyeOffFill size={20} />
                  ) : (
                    <RiEyeFill size={20} />
                  )}
                </span>
              </div>
              {errors.newPassword && touched.newPassword && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/** Confirm Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showReEnterPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Re-Enter Password"
                  className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-gray-300"
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => togglePasswordVisibility("reenter")}
                >
                  {showReEnterPassword ? (
                    <RiEyeOffFill size={20} />
                  ) : (
                    <RiEyeFill size={20} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CpProfile;
