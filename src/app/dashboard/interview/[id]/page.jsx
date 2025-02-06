"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GoAlert } from "react-icons/go";
import { LiaMicrophoneSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

function Interview({ params }) {
  console.log("params : " + JSON.stringify(params));

  const router = useRouter();

  const [data, setData] = useState();
  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const toastId = toast.loading("Loading....");
        const response = await axios.post("/api/users/getquesans", {
          id: params.id,
        });
        // console.log("response : " + JSON.stringify(response));
        toast.dismiss(toastId);
        setData(response?.data?.data);
      } catch (error) {
        toast.error("Sorry for intereptution, try after some time");
        // console.log(error);
      }
    };
    getInterviewDetails();
    // setData(quesandans);
  }, [params]);

  const mediaRecorderRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  function handleAudioAndVideo() {}

  function checkDeviceMicAndCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          // Permissions granted for both microphone and camera
          console.log("Microphone and camera are accessible.");
          setShowButton(!showButton); // Toggle the button or do other actions here

          // Stop video stream to avoid unwanted camera activation
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((error) => {
          // Handle permissions denied or missing devices
          if (error.name === "NotAllowedError") {
            alert(
              "Permissions denied. Please allow access to both microphone and camera."
            );
          } else if (error.name === "NotFoundError") {
            alert(
              "No accessible camera found. Please ensure a camera is connected and try again."
            );
          } else {
            alert("An error occurred: " + error.message);
          }
        });
    } else {
      alert(
        "Your browser does not support media access. Try using a different browser."
      );
    }
  }

  function handleStartInterview() {
    router.push(`/dashboard/interview/${params.id}/start`);
  }

  // console.log("data : " + JSON.stringify(data));

  return (
    <div className="flex flex-col items-start mx-auto p-6 h-svh bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">
        Let's Get Started
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[90%] rounded-lg">
        {/* left div */}
        <div className=" flex items-center justify-center flex-col">
          <div className="w-[90%] mt-5 border-1 border-gray-200 shadow-md rounded-md bg-slate-100 text-gray-700 space-y-6 p-5">
            <p className="text-base">
              <span className="font-bold text-xl">
                Job Role / Job Description :{" "}
              </span>
              {data && data[0]?.role}
            </p>
            <p className="text-base">
              <span className="text-xl font-semibold"> Tech Stack :</span>
              {data && data[0]?.techStack}
            </p>
            <p className="text-base">
              <span className="text-xl font-semibold">
                Years Of Experience :{" "}
              </span>
              {data && data[0]?.experience} years
            </p>
          </div>
          <div className="w-[90%] border-1 border-yellow-200 shadow-lg rounded-md bg-red-300 mt-4 text-gray-700 space-y-6 p-5 mb-5">
            <h1 className="flex flex-row space-x-4 text-yellow-200">
              <GoAlert className="mr-2 mt-1" />
              Information
            </h1>
            <p className="text-base text-violet-500">
              Enable video web cam and give access microphone to record your
              audio.
              <span>Click Start Interview button</span> , after recording submit
              your test. After that you get your result based upon your input.
              <span className="text-blue-500">
                We never record your video and audio get recorded only for
                analysing purpose.
              </span>
              If you want you can stop video at any time.
            </p>
          </div>
        </div>
        {/* right div */}
        <div className="flex flex-col items-center justify-center space-y-5 text-white border-1 border-gray-200 rounded-md">
          <div
            onClick={handleAudioAndVideo}
            className="h-36 w-60 bg-gray-300 flex items-center justify-center border-1 border-gray-200 rounded-md cursor-pointer"
          >
            <LiaMicrophoneSolid className="text-6xl text-zinc-900" />
          </div>
          <button
            onClick={checkDeviceMicAndCamera}
            className="ml-4 text-base px-2 py-1 rounded-md bg-blue-500 shadow-sm hover:bg-blue-300 transition duration-300 ease-out hover:scale-105 hover:shadow-md"
          >
            Test Your Mic
          </button>
          {showButton && (
            <>
              <p className="text-base text-gray-950 mt-5">Click Start Button</p>
              <button
                onClick={handleStartInterview}
                className="px-2 py-1 text-base rounded-md hover-md bg-blue-500 hover:bg-blue-300 hover:shadow-lg transition duration-300 hover:scale-100"
              >
                Start
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Interview;
