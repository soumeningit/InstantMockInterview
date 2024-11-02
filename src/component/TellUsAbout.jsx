"use client";
import React, { useState } from "react";
import { countryName } from "./sampledata/countryname";
import { dialCode } from "./sampledata/coutryDialCode";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function TellUsAbout() {
  const userId = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    dob: "",
    address: "",
    country: "",
    dialCode: "",
    phoneno: "",
    userId: userId,
  });

  function changeHandler(event) {
    setFormData((prevDta) => {
      return {
        ...prevDta,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let number = formData.dialCode + "-" + formData.phone;
    formData.phoneno = number;
    console.log(formData);
    submitData();
  }

  async function submitData() {
    try {
      const toastId = toast.loading("Loading....");
      const response = await axios.post(
        "/api/users/addAdditionalDetails",
        formData
      );
      toast.dismiss(toastId);
      // console.log("response : " + JSON.stringify(response));
      if (response.data.success) {
        toast.success("Data submitted successfully");
        setFormData({
          phone: "",
          gender: "",
          dob: "",
          address: "",
          country: "",
          dialCode: "",
          phoneno: "",
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      toast.error(error.data);
    }
  }

  return (
    <div className="flex flex-col items-center p-4 m-4">
      <h1 className="text-xl font-bold text-gray-800 text-pretty">
        Tell us more about yourself
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 p-2 m-2 relative"
      >
        <div className="flex flex-col p-2 m-2 space-y-2">
          <label htmlFor="phone">Your Phone No : </label>
          <div className="flex flex-row space-x-1">
            <select
              name="dialCode"
              id="dialCode"
              value={formData.dialCode}
              onChange={changeHandler}
              className="w-[6rem] rounded-md outline-none p-2 border-2 border-gray-200 focus:border-2 focus:border-cyan-300 text-gray-900 "
            >
              <option value="">Select</option>
              {dialCode.map((item, index) => {
                return (
                  <option key={index} value={item.dial_code}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={changeHandler}
              placeholder="Type your mobile no.."
              className="w-full rounded-md outline-none p-2 border-2 border-gray-200 focus:border-2 focus:border-cyan-300 text-gray-900 "
            />
          </div>
        </div>
        <div className="flex flex-col p-2 m-2 space-y-2">
          <label htmlFor="gender">Your Gender : </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={changeHandler}
            className="w-full rounded-md outline-none p-2 border-2 border-gray-200 focus:border-2 focus:border-cyan-300 text-gray-900"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col p-2 m-2 space-y-2">
          <label htmlFor="dob">Your Date of Birth : </label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={changeHandler}
            className="w-full rounded-md outline-none p-2 border-2 border-gray-200 focus:border-2 focus:border-cyan-300 text-gray-900"
          />
        </div>
        <div className="flex flex-col p-2 m-2 space-y-2">
          <label htmlFor="address">Your Address : </label>
          <textarea
            name="address"
            id="address"
            value={formData.address}
            onChange={changeHandler}
            className="w-full rounded-md outline-none p-2 border-2 border-gray-200 focus:border-2 focus:border-cyan-300 text-gray-900"
          />
        </div>
        <div className="flex flex-col p-2 m-2 space-y-2">
          <label htmlFor="city">Your Country : </label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={changeHandler}
            className="w-full rounded-md outline-none p-2 border-2 border-gray-200 focus:border-2 focus:border-cyan-300 text-gray-900"
          >
            <option value="">Select Country</option>
            {countryName?.map((data, index) => {
              return (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="absolute right-4 bottom-5">
          <button
            type="submit"
            className="px-2 py-1 bg-slate-500 text-gray-300 rounded-md text-base hover:scale-105 transition ease-out duration-300 shadow-sm hover:shadow-md hover:bg-slate-200 hover:text-gray-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TellUsAbout;
