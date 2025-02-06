"use client";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setDetails, setToken, setUser } from "../redux/slices/authSlice";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const logInUser = async () => {
    setLoading(true);
    toast.loading("Loading....");
    try {
      const response = await axios.post("/api/users/login", formData);
      setLoading(false);
      toast.remove();
      // console.log("log in response : " + JSON.stringify(response));
      dispatch(setToken(response?.data?.token));
      dispatch(setUser(response?.data?.user?._id));
      dispatch(setDetails(JSON.stringify(response?.data?.user)));
      setUserData(response.data);
      if (response.data.success) {
        toast.success("Logged in successfully");
      } else {
        toast.error(response.data.message);
      }
      // console.log("response?.data?.user?._id : " + response?.data?.user?._id);
      // Redirect to dashboard
      router.push(`/dashboard/profile/${response?.data?.user?._id}`);
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  function submitHandler(e) {
    e.preventDefault();
    // console.log("login formdata : ", formData);
    logInUser();
  }

  return (
    <>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-4" onSubmit={submitHandler}>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-extrabold">
                    Sign in
                  </h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    Sign in to your account and explore a world of
                    possibilities. Your journey begins here.
                  </p>
                </div>

                <div>
                  <div className="flex flex-row space-x-1">
                    <label className="text-gray-800 text-sm mb-2 block">
                      Email
                    </label>
                    <span className="text-sm font-bold text-red-500">
                      <sup>*</sup>
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="text"
                      value={formData.email}
                      onChange={changeHandler}
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter user name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col relative">
                  <div className="flex flex-row space-x-1">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-800"
                    >
                      Password
                    </label>
                    <span className="text-sm font-bold text-red-500">
                      <sup>*</sup>
                    </span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter your password"
                    className="p-3 mt-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none mt-[1.6rem]"
                  >
                    {showPassword ? (
                      <IoEyeOff size={20} />
                    ) : (
                      <IoEye size={20} />
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    {/* <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      for="remember-me"
                      className="ml-3 block text-sm text-gray-800"
                    >
                      Remember me
                    </label> */}
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgetpassword"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Log in
                  </button>
                </div>

                <p className="text-sm !mt-8 text-center text-gray-800">
                  Don't have an account{" "}
                  <Link
                    href="/signup"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
            <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
              <img
                src="https://readymadeui.com/login-image.webp"
                className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
                alt="Dining Experience"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
