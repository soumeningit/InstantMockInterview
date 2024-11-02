"use client";

import { setQuesandAns } from "@/app/redux/slices/quesandansSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GiCancel } from "react-icons/gi";
import { useDispatch } from "react-redux";

export default function Modal({ params }) {
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    role: "",
    position: "",
    experience: 0,
    userId: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleModal = () => {
    setShowModal(!showModal);
    router.push("/dashboard/profile");
  };

  async function handleCreateInterview() {
    formData.userId = params?.id;
    // console.log(formData);
    toast.loading("Loading....");
    try {
      const response = await axios.post(
        "/api/users/createquestionanswer",
        formData
      );
      toast.remove();
      console.log("response : " + JSON.stringify(response));
      if (response?.data?.success) {
        setShowModal(!showModal);
        router.push(`/dashboard/interview/${response?.data?.data?._id}`);
        dispatch(setQuesandAns(response?.data?.data));
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function changeHandler(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="flex flex-col gap-4 ">
                    <h3 className="text-3xl font-semibold">
                      Tell us about your job role
                    </h3>
                    <p className="text-sm">
                      Add details about you job position, skills, year of
                      experience
                    </p>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleModal}
                  >
                    <span className=" text-red-500 opacity-100 font-bold z-40 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <GiCancel className="text-2xl text-red-700" />
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-6 flex-auto bg-white shadow-sm rounded-lg">
                  <form className="flex flex-col w-full space-y-4">
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Job Position / Role Name
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={changeHandler}
                        className="p-2 rounded-md w-full bg-slate-50 border border-gray-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400 transition duration-200"
                        placeholder="e.g., Frontend Developer"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="position"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Job Description / Tech Stack
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={changeHandler}
                        className="p-4 w-full rounded-md bg-slate-50 border border-gray-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400 transition duration-200"
                        placeholder="e.g., React, Node.js, CSS"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Experience (Years)
                      </label>
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={changeHandler}
                        className="p-1 w-full rounded-md bg-slate-50 border border-gray-300 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400 transition duration-200"
                        placeholder="e.g., 2"
                      />
                    </div>
                  </form>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCreateInterview}
                  >
                    Start Interview
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
