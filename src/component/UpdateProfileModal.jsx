"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function UpdateProfileModal({ onClose }) {
  const userId = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("file : " + file);
    if (file) {
      setImage(file);
      setFileName(file.name);
    }
    console.log("file name : " + file.name);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default to allow drop
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submission logic here
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("displayimage", image);
    formData.append("email", email);
    console.log("form Data : " + formData);
    const toastId = toast.loading("Loading....");
    try {
      const response = await axios.post("/api/users/updateProfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("response : " + response);
      toast.dismiss(toastId);
      if (response?.data?.success) {
        setSuccessMessage("Profile updated successfully");
        onClose();
      } else {
        setErrorMessage(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Update Profile
        </h2>

        <div
          className="flex items-center justify-center w-full mb-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {fileName && (
            <p className="mt-2 text-sm text-gray-600">Uploaded: {fileName}</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              New Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="outline-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-200 ease-in-out"
              placeholder="If you want to update then add new email else left blank"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfileModal;
