"use client";
import React, { useState } from "react";
import { CgMail } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    subject: "",
  });

  const router = useRouter();

  function changeHandler(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    const response = await axios.post("/api/users/contact", { formData });
    console.log("response : " + JSON.stringify(response));
    if (response.status === 200) {
      toast.success(response.data.message);
      router.push("/");
    }
  }

  return (
    <>
      <div className="flex flex-col font-sans bg-white">
        <h1 className="text-2xl font-bold mx-auto">Contact Us</h1>
        <div className="flex items-center justify-center align-middle mx-auto w-full relative mt-[10rem]">
          <div className="w-7/12 flex flex-row space-x-6 items-center justify-center align-middle">
            <div className="border-gray-200 shadow-md my-2 rounded-md bg-slate-800 p-4 items-start">
              <div className="space-y-2 mb-5 p-2">
                <h2 className="text-xl font-bold text-gray-200">
                  Contact Information
                </h2>
                <p className="text-base text-gray-300">
                  Thanks for contacting Us. We are happy to help you
                </p>
                <p className="text-base text-gray-300">
                  Feel free to give any suggestion.
                </p>
              </div>
              <div className="mt-4 space-y-6">
                <p className="flex flex-row text-base text-gray-200">
                  <CgMail className="text-base mt-[0.3rem] mr-2" />
                  info@example.com
                </p>
                <p className="flex flex-row text-base text-gray-200">
                  <MdOutlinePhone className="text-base mt-[0.3rem] mr-2" />
                  +91-6548793245
                </p>
              </div>
              <div className="mt-4 mb-2 flex flex-row space-x-4 text-2xl cursor-pointer">
                <FaInstagram className="text-gray-500 hover:text-pink-500 transform hover:scale-110 transition duration-300" />
                <FaLinkedin className="text-gray-500 hover:text-blue-600 transform hover:scale-110 transition duration-300" />
                <FaTwitter className="text-gray-500 hover:text-blue-400 transform hover:scale-110 transition duration-300" />
              </div>
            </div>
            <div className="bg-zinc-200 shadow-md rounded-md p-4 w-full gap-6 my-2">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 relative"
              >
                <div className="flex flex-col p-2">
                  <label htmlFor="name">Your Name : </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    className="outline-none border-2 border-gray-200 rounded-md p-2 shadow-sm focus:border-2 focus:border-teal-500 bg-gray-700 text-gray-200 focus:bg-slate-300 focus:text-zinc-800"
                  />
                </div>
                <div className="flex flex-col p-2">
                  <label htmlFor="email">Your Email : </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    className="outline-none border-2 border-gray-200 rounded-md p-2 shadow-sm focus:border-2 focus:border-teal-500 bg-gray-700 text-gray-200 focus:bg-slate-300 focus:text-zinc-800"
                  />
                </div>
                <div className="flex flex-col p-2">
                  <label htmlFor="phone">Phone : </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={changeHandler}
                    className="outline-none border-2 border-gray-200 rounded-md p-2 shadow-sm focus:border-2 focus:border-teal-500 bg-gray-700 text-gray-200 focus:bg-slate-300 focus:text-zinc-800"
                  />
                </div>
                <div className="flex flex-col p-2">
                  <label htmlFor="message">Country : </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={changeHandler}
                    className="outline-none border-2 border-gray-200 rounded-md p-2 shadow-sm focus:border-2 focus:border-teal-500 bg-gray-700 text-gray-200 focus:bg-slate-300 focus:text-zinc-800"
                  />
                </div>
                <div className="flex flex-col p-2">
                  <label htmlFor="message">Message : </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={changeHandler}
                    className="outline-none border-2 border-gray-200 rounded-md p-2 shadow-sm focus:border-2 focus:border-teal-500 bg-gray-700 text-gray-200 focus:bg-slate-300 focus:text-zinc-800"
                  />
                </div>
                <div className="absolute right-4 bottom-4 flex flex-row bg-blue-600 text-white rounded-md hover:bg-blue-400 hover:scale-105 transition ease-out duration-300">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xl text-pretty text-center flex flex-row"
                  >
                    Send <TbSend className="text-xl ml-2 mt-[0.2rem]" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
