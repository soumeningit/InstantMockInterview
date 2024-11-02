"use client";
import DeleteAccount from "@/component/DeleteAccount";
import ShowAdditionalDetails from "@/component/ShowAdditionalDetails";
import TellUsAbout from "@/component/TellUsAbout";
import UpdateProfileModal from "@/component/UpdateProfileModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Settings() {
  const userId = useSelector((state) => state.auth.user);

  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      const toastId = toast.loading("loading....");
      try {
        const response = await axios.post("/api/users/getUserDetails", {
          userId: userId,
        });
        toast.dismiss(toastId);
        // console.log("response : " + JSON.stringify(response));
        setUser(response?.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        toast.dismiss(toastId);
      }
    };
    getUserDetails();
  }, []);

  function handleEdit(event) {
    console.log("Edit button clicked");
    event.preventDefault();
    setShowModal(!showModal);
  }

  function closeModal() {
    setShowModal(!showModal);
  }

  // console.log("user : " + JSON.stringify(user));

  return (
    <div className="flex flex-col items-center justify-center p-4 m-5">
      <div className="bg-[#cac6c6c7] p-4 m-4 grid grid-cols-2 rounded-md relative">
        <div className="flex flex-row space-x-2 ">
          <div className="rounded-full h-[2.4rem] w-[2.1rem] flex items-center justify-center border-2 border-gray-500 ">
            <img
              src={user?.user?.image}
              alt="userImage"
              loading="lazy"
              className="h-[1.5rem] w-[1.5rem] rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p>{user?.user?.name}</p>
            <p>{user?.user?.email}</p>
          </div>
        </div>
        <div className="absolute right-4 top-5">
          <button
            onClick={handleEdit}
            className="px-2 py-1 bg-slate-500 text-gray-300 rounded-md text-base"
          >
            Edit
          </button>
        </div>
        {showModal && <UpdateProfileModal onClose={closeModal} />}
      </div>
      {/* show user details */}
      <div className="bg-[#7a787898] p-4 m-4 rounded-md relative w-3/4">
        <ShowAdditionalDetails user={user} />
      </div>
      {/* tell us about yourself */}
      <div className="bg-[#cac6c6c7] p-4 m-4 rounded-md relative w-3/4">
        <TellUsAbout />
      </div>
      {/* deleteaccount */}
      <div className=" p-4 m-4 rounded-md relative w-3/4">
        <DeleteAccount />
      </div>
    </div>
  );
}

export default Settings;
