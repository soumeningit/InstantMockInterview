"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState();

  const router = useRouter();

  function checkPasswordStrength(password) {
    setError("");
    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
    } else {
      setError("");
    }
  }

  function changeHandler(event) {
    if (event.target.name === "password") {
      checkPasswordStrength(event.target.value);
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    }
  }

  async function signUpUser() {
    // try {
    //   const response = await axios.post("/api/users/signup", formData);
    //   console.log("response : " + response);
    //   toast.success("User created successfully");
    //   router.push("/login");
    // } catch (error) {
    //   toast.error("Error signing up");
    // }

    try {
      // const data = {
      //   name: formData.name,
      //   email: formData.email,
      // };
      // console.log("data : " + data);
      const response = await axios.post("/api/users/otpsender", formData);
      console.log("response : " + response?.data);
      console.log("response : " + JSON.stringify(response?.data));
      sessionStorage.setItem("formData", JSON.stringify(formData));
      toast.success("OTP send successfully");
      router.push("/otp");
    } catch (error) {
      console.log("error : " + error);
      toast.error();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password mismatched");
      return;
    }
    console.log("formData:", JSON.stringify(formData));
    signUpUser();
  }

  return (
    // <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-opacity-20 backdrop-blur-xl rounded-xl shadow-lg border border-white border-opacity-30">
    //   <h1 className="text-3xl font-bold text-sky-700 mb-6 mt-24">Sign Up</h1>
    //   <div className="grid grid-cols-2 p-5 m-4">
    //     <div className="flex items-center justify-center p-4 rounded-md">
    //       <img
    //         src="https://res.cloudinary.com/dhu8fpog1/image/upload/v1730556241/SignUp_Image_ybhimq.jpg"
    //         alt="sign_up_page"
    //         loading="lazy"
    //         className="object-cover h-[90%] w-[90%] rounded-md"
    //       />
    //     </div>
    //     <div className="flex items-center p-5 m-4">
    //       <form
    //         onSubmit={handleSubmit}
    //         className="flex flex-col space-y-6 w-full max-w-md bg-white bg-opacity-30 p-8 rounded-xl backdrop-blur-lg shadow-lg border border-opacity-40"
    //       >
    //         <div className="flex flex-col">
    //           <div className="flex flex-row space-x-1">
    //             <label
    //               htmlFor="name"
    //               className="text-sm font-semibold text-gray-800"
    //             >
    //               Full Name
    //             </label>
    //             <span className="text-base text-red-500 font-bold">
    //               <sup>*</sup>
    //             </span>
    //           </div>
    //           <input
    //             type="text"
    //             id="name"
    //             name="name"
    //             value={formData.name}
    //             onChange={changeHandler}
    //             required
    //             placeholder="Enter your full name "
    //             className="p-3 mt-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
    //           />
    //         </div>

    //         <div className="flex flex-col">
    //           <div className="flex flex-row space-x-1">
    //             <label
    //               htmlFor="email"
    //               className="text-sm font-semibold text-gray-800"
    //             >
    //               Email
    //             </label>
    //             <span className="text-base text-red-500 font-bold">
    //               <sup>*</sup>
    //             </span>
    //           </div>
    //           <input
    //             type="email"
    //             id="email"
    //             name="email"
    //             value={formData.email}
    //             onChange={changeHandler}
    //             required
    //             placeholder="Enter your email "
    //             className="p-3 mt-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
    //           />
    //         </div>

    //         {/* Password Input Field */}
    //         <div className="flex flex-col relative">
    //           <div className="flex flex-row space-x-1">
    //             <label
    //               htmlFor="email"
    //               className="text-sm font-semibold text-gray-800"
    //             >
    //               Password
    //             </label>
    //             <span className="text-base text-red-500 font-bold">
    //               <sup>*</sup>
    //             </span>
    //           </div>
    //           <input
    //             type={showPassword ? "text" : "password"}
    //             id="password"
    //             name="password"
    //             value={formData.password}
    //             onChange={changeHandler}
    //             required
    //             className="p-3 mt-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 pr-12"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => setShowPassword(!showPassword)}
    //             className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none mt-[1.6rem]"
    //           >
    //             {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
    //           </button>
    //           {error && (
    //             <p className="text-red-600 text-sm font-bold">{error}</p>
    //           )}
    //         </div>

    //         {/* Confirm Password Input Field */}
    //         <div className="flex flex-col relative">
    //           <div className="flex flex-row space-x-1">
    //             <label
    //               htmlFor="confirmPassword"
    //               className="text-sm font-semibold text-gray-800"
    //             >
    //               Confirm Password
    //             </label>
    //             <span className="text-base text-red-500 font-bold">
    //               <sup>*</sup>
    //             </span>
    //           </div>
    //           <input
    //             type={showConfirmPassword ? "text" : "password"}
    //             id="confirmPassword"
    //             name="confirmPassword"
    //             value={formData.confirmPassword}
    //             onChange={changeHandler}
    //             disabled={error}
    //             required
    //             className="p-3 mt-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 pr-12"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    //             className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none mt-[1.6rem] "
    //           >
    //             {showConfirmPassword ? (
    //               <IoEyeOff size={20} />
    //             ) : (
    //               <IoEye size={20} />
    //             )}
    //           </button>
    //         </div>

    //         <button
    //           type="submit"
    //           className="px-4 py-3 rounded-md bg-indigo-600 text-white font-bold text-md hover:bg-indigo-500 transition duration-300"
    //         >
    //           Sign Up
    //         </button>
    //         <p className="text-sm !mt-8 text-center text-gray-800">
    //           Already have an account{" "}
    //           <Link
    //             href="/login"
    //             className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
    //           >
    //             Sign In Here
    //           </Link>
    //         </p>
    //       </form>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-opacity-20 backdrop-blur-xl rounded-xl shadow-lg border border-white border-opacity-30">
      <h1 className="text-3xl font-bold text-sky-700 mb-6 mt-24">Sign Up</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 m-4 w-full">
        <div className="flex items-center justify-center p-4 rounded-md">
          <img
            src="https://res.cloudinary.com/dhu8fpog1/image/upload/v1730556241/SignUp_Image_ybhimq.jpg"
            alt="sign_up_page"
            loading="lazy"
            className="object-cover h-[90%] w-[90%] rounded-md"
          />
        </div>
        <div className="flex items-center p-5 m-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 w-full max-w-md sm:w-11/12 md:w-11/12 lg:w-96 bg-white bg-opacity-30 p-8 rounded-xl backdrop-blur-lg shadow-lg border border-opacity-40"
          >
            <div className="flex flex-col">
              <div className="flex flex-row space-x-1">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-800"
                >
                  Full Name
                </label>
                <span className="text-base text-red-500 font-bold">
                  <sup>*</sup>
                </span>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                required
                placeholder="Enter your full name "
                className="p-3 mt-2 md:w-full sm:w-full bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row space-x-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <span className="text-base text-red-500 font-bold">
                  <sup>*</sup>
                </span>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                required
                placeholder="Enter your email "
                className="p-3 mt-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Password Input Field */}
            <div className="flex flex-col relative">
              <div className="flex flex-row space-x-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <span className="text-base text-red-500 font-bold">
                  <sup>*</sup>
                </span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                required
                className="p-3 mt-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none mt-[1.6rem]"
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
              {error && (
                <p className="text-red-600 text-sm font-bold">{error}</p>
              )}
            </div>

            {/* Confirm Password Input Field */}
            <div className="flex flex-col relative">
              <div className="flex flex-row space-x-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-gray-800"
                >
                  Confirm Password
                </label>
                <span className="text-base text-red-500 font-bold">
                  <sup>*</sup>
                </span>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
                disabled={error}
                required
                className="p-3 mt-2 bg-white bg-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none mt-[1.6rem] "
              >
                {showConfirmPassword ? (
                  <IoEyeOff size={20} />
                ) : (
                  <IoEye size={20} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-3 rounded-md bg-indigo-600 text-white font-bold text-md hover:bg-indigo-500 transition duration-300"
            >
              Sign Up
            </button>
            <p className="text-sm !mt-8 text-center text-gray-800">
              Already have an account{" "}
              <Link
                href="/login"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Sign In Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
