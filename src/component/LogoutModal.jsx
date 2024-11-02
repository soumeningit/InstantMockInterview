"use client";
import { logout, setToken } from "@/app/redux/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function LogoutModal({ setOpen }) {
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleDelete() {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(logout());
        setOpen();
        router.push("/home");
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-md">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Close Button */}
            <button
              onClick={setOpen}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7L1 13m6-6l6-6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            {/* Modal Content */}
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                Are you sure you want to log out?
              </h3>
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
              >
                Yes, log out
              </button>
              <button
                onClick={setOpen}
                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
