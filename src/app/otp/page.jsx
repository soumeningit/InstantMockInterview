"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [formData, setFormData] = useState();

  const router = useRouter();

  const handleInputChange = (index, value) => {
    if (value.match(/^\d?$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if value is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  useEffect(() => {
    const storedFormData = sessionStorage.getItem("formData");
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      console.log("Received formData:", parsedData);
      setFormData(parsedData);
    }
  }, []);

  async function signUp(formData) {
    console.log("Inside sign up");
    console.log("formData : " + formData);
    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log("sign up response : " + JSON.stringify(response));
      console.log("response?.data?.success " + response?.data?.success);
      if (response?.data?.success) {
        toast.success("Sign up successful");
        sessionStorage.removeItem("formData");
        router.push("/login");
      } else {
        toast.error(response?.data?.message);
        router.push("/login");
        sessionStorage.removeItem("formData");
      }
    } catch (error) {
      toast.error("Error signing up");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification here
    const newOtp = otp.join("");
    console.log("Entered OTP:", newOtp);
    formData.otp = newOtp;
    console.log("formData : " + JSON.stringify(formData));
    signUp(formData);
  };

  const handleResend = async () => {
    console.log("Resending code...");
    try {
      const data = {
        name: formData.name,
        email: formData.email,
      };
      const response = await axios.post("/api/users/otpsender", data);
      // console.log("response : " + JSON.stringify(response));
      if (response?.data?.success) {
        toast.success("OTP Sended");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(response?.data?.message);
    }
  };

  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1 text-gray-900">
                  OTP Verification
                </h1>
                <p className="text-[15px] text-slate-800">
                  Enter the 4-digit verification code that was sent to your
                  registered email.
                </p>
              </header>
              <form id="otp-form" onSubmit={handleSubmit}>
                <div className="flex items-center justify-center gap-3">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ))}
                </div>
                <div className="max-w-[260px] mx-auto mt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                  >
                    Verify Account
                  </button>
                </div>
              </form>
              <div className="text-sm text-slate-800 mt-4">
                Didn't receive code?{" "}
                <button
                  onClick={handleResend}
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Banner with links */}
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-6 md:right-12 md:w-auto z-50">
          <div className="bg-slate-800 text-sm p-3 md:rounded shadow flex justify-between">
            <div className="text-slate-500 inline-flex">
              <a
                className="font-medium hover:underline text-slate-300"
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Tutorial
              </a>
              <span className="italic px-1.5">or</span>
              <a
                className="font-medium hover:underline text-indigo-500 flex items-center"
                href="https://github.com/cruip/cruip-tutorials/blob/main/otp-form/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download</span>
                <svg
                  className="fill-indigo-400 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="9"
                >
                  <path d="m1.649 8.514-.91-.915 5.514-5.523H2.027l.01-1.258h6.388v6.394H7.158l.01-4.226z" />
                </svg>
              </a>
            </div>
            <button
              className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-slate-700"
              onClick={() => setBannerOpen(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4 shrink-0 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OTPVerification;
