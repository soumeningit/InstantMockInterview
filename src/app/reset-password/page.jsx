"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
  };

  async function changePassword() {
    try {
      const response = await axios.post("/api/users/resetpassword", {
        resetToken: token,
        password: formData.confirmPassword,
      });
      // console.log("response : " + JSON.stringify(response));
      if (response?.data?.success) {
        setSuccessMessage("Password changed successfully");
        toast.success("Password change Successfully");
        router.push("/login");
      } else {
        setError(response?.data?.message);
        toast.error("Password reset failed!");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate password when typing
    if (name === "password") {
      if (!validatePassword(value)) {
        setError(
          "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      } else {
        setError(null);
      }
    }

    // Check if confirm password matches
    if (name === "confirmPassword" && value !== formData.password) {
      setError("Passwords do not match.");
    } else if (name === "confirmPassword") {
      setError(null);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    // Final validation before submission
    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Reset password logic (e.g., API call) goes here.
    changePassword();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
        <p className="text-center mb-4">
          Enter your new password and confirm it.
        </p>

        <form onSubmit={submitHandler} className="flex flex-col space-y-4">
          {/* Password Input Field */}
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-800"
            >
              Password
              <span className="text-red-500 font-bold"> *</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              required
              className="p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2 mt-[1.5rem]"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
            {error && <p className="text-red-600 text-sm font-bold">{error}</p>}
          </div>

          {/* Confirm Password Input Field */}
          <div className="flex flex-col relative">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-gray-800"
            >
              Confirm Password
              <span className="text-red-500 font-bold"> *</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={changeHandler}
              required
              className="p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2 mt-[1.5rem]"
            >
              {showConfirmPassword ? (
                <IoEyeOff size={20} />
              ) : (
                <IoEye size={20} />
              )}
            </button>
          </div>

          {successMessage && (
            <p className="text-green-600 text-sm font-bold">{successMessage}</p>
          )}
          <div className="flex flex-row justify-between text-base">
            <Link href={"/forgetpassword"}>
              <p className="text-red-500 text-sm font-bold mt-2">
                if token xpired
              </p>
            </Link>
            <Link href={"/forgetpassword"}>
              <p className="text-blue-500 text-sm font-bold mt-2">
                Resend Link
              </p>
            </Link>
          </div>

          <button
            type="submit"
            className="px-4 py-3 rounded-md bg-indigo-600 text-white font-bold text-md hover:bg-indigo-500 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
