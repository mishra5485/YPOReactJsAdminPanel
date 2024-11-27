import React from "react";

const Registeration = () => {
  return (
    <div
      className=" min-h-screen w-full flex py-16 justify-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className=" ">
        {/* logo and text */}
        <div className="md:w-96 w-72">
          <img src="/logo.jpeg" />
        </div>

        {/* login details */}

        <div className=" flex flex-col w-full ">
          <h2 className="font-semibold text-center text-3xl">Login</h2>
          <div className=" md:w-96 w-72 flex flex-col gap-4 ">
            {/* user id */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                User ID
              </label>
              <input
                type="text"
                className="py-2 px-4 rounded-md border border-gray-300 placeholder:text-gray-500"
                placeholder="Enter Username"
              />
            </div>

            {/* password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-medium">
                Password
              </label>
              <input
                type="password"
                className="py-2 px-4 rounded-md border border-gray-300 placeholder:text-gray-500"
                placeholder="Enter Your Password"
              />
            </div>

            {/* submit btn */}
            <button
              type="submit"
              className="bg-blue-900 text-white rounded-md p-2  mt-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registeration;
