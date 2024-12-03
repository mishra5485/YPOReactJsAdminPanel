import { useFormik } from "formik";
import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import * as yup from "yup";
import getLoginData from "../../commonfunctions/getLoginData";

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

const SaProfile = () => {
  const loggedInUserData = getLoginData();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field == "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field == "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field == "reenter") {
      setShowReEnterPassword(!showReEnterPassword);
    }
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
          `${
            import.meta.env.VITE_REACT_APP_BASE_URL
          }/user/userChangePassword`,
          payload
        );
        toast.success(response.data.message);
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
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-6 md:p-8">
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
              <p className="text-sm text-red-600 mt-2">{errors.newPassword}</p>
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
    </div>
  );
};

export default SaProfile;
