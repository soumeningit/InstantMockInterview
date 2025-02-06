"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState();

  const changeHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandle = async (e) => {
    setError("");
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/createresetpasswordtoken", {
        email,
      });
      setResponse(response.data);
      setError("");
      console.log("response : ", response?.data);
      if (response?.status) {
        toast.success("Successfully send Reset mail");
      } else {
        toast.error("Reset mail send failed");
      }
    } catch (error) {
      setError(error.message);
      console.log("Forget-Password Token Error : " + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Forgot Password
        </h1>
        <p className="text-base text-gray-600 mb-6 text-center">
          Don’t worry about your password. Enter your registered email, and
          we’ll send you a reset link.
        </p>
        <form onSubmit={submitHandle} className="space-y-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Enter your email <sup className="text-red-500 text-lg mt-5">*</sup>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={changeHandler}
            placeholder="Enter your registered email"
            required
            className="w-full p-3 border rounded-md bg-gray-600 focus:outline-none focus:border-blue-500"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-colors"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
