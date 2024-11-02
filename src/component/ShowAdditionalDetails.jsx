"use client";
import React from "react";

function ShowAdditionalDetails({ user }) {
  // console.log("user?.user?.member " + user?.user?.member);
  return (
    <div className=" p-4 m-5 shadow-sm rounded-lg ">
      <h2 className="text-center text-xl text-white font-bold p-2 m-2">
        Your Details
      </h2>
      <div className="grid grid-cols-2 p-2 m-2">
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex gap-2">
            <p className="text-base text-pretty text-white">Name :</p>
            <p className="text-base text-pretty text-white">
              {user?.user?.name}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-pretty text-white">Phone No :</p>
            <p className="text-base text-pretty text-white">
              {user?.user?.additionalDetails?.phoneNo}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-base text-pretty text-white">Address</p>
            <p className="text-base text-pretty text-white">
              {user?.user?.additionalDetails?.address}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-pretty text-white">Member :</p>
            <p className="text-base text-pretty text-white">{`${
              user?.user?.member ? "Yes" : "No"
            }`}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 p-2">
          <div className="flex gap-2">
            <p className="text-base text-pretty text-white">Email :</p>
            <p className="text-base text-pretty text-white">
              {user?.user?.email}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-pretty text-white">Date of Birth :</p>
            <p className="text-base text-pretty text-white">
              {new Date(user?.user?.additionalDetails?.dob).toDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-pretty text-white">Gender :</p>
            <p className="text-base text-pretty text-white">
              {user?.user?.additionalDetails?.gender
                ? user.user.additionalDetails.gender.charAt(0).toUpperCase() +
                  user.user.additionalDetails.gender.slice(1)
                : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-pretty text-white">
              Member Card Validity :
            </p>
            <p className="text-base text-pretty text-white"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAdditionalDetails;
