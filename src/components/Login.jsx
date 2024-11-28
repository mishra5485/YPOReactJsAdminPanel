import React from "react";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { LoginSchema } from "../schemas";
import { AccessLevel } from "../commonfunctions/Enums";

const initialValues = {
  MemberId: "",
  Password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const payloadData = {
        member_id: values.MemberId,
        password: values.Password,
      };

      try {
        const { data, status } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/login`,
          payloadData
        );

        const { Role: responseUserRole, message: responseMessage } = data?.data || {};

        if (status == 200) {
          localStorage.setItem("loginData", JSON.stringify(data?.data));
          const route = responseUserRole == AccessLevel.SuperAdmin
            ? "/sp/dashboard/sahome"
            : "/cp/dashboard/cphome";
            navigate(route);
            resetForm();
            toast.success(responseMessage || "Login successful", {
              style: { background: "green", color: "white" },
            });
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong! Please try again.";

        toast.error(errorMessage, {
          style: { background: "black", color: "white" },
        });
      }
    },
  });

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center bg-slate-300 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 h-screen">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border-2 p-4 border-black-600 rounded-md bg-white shadow-lg shadow-cyan-500/50">
          <div className="mb-5 flex justify-center">
            <img src={logo} alt="Logo" width="300px" />
          </div>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="memberId"
                  className="text-base font-medium text-gray-900"
                >
                  MemberId
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    autoComplete="off"
                    name="MemberId"
                    id="memberId"
                    placeholder="Please enter your MemberId"
                    value={values.MemberId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.MemberId && touched.MemberId && (
                    <p className="text-red-600">{errors.MemberId}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    autoComplete="off"
                    name="Password"
                    id="password"
                    placeholder="Please enter your Password"
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.Password && touched.Password && (
                    <p className="text-red-600">{errors.Password}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-sky-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-sky-700/80"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
