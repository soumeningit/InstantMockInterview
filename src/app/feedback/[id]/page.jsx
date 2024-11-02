"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function FeedBack({ params }) {
  //   console.log(params);
  const interviewId = params.id;
  //   console.log(interviewId);

  const userId = useSelector((state) => state.auth.user);
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Rating:", rating);
    // console.log("Message:", message);
    // API call to send feedback to server
    const feedbackresponse = await axios.post("/api/users/feedback", {
      userId: userId,
      interviewId: interviewId,
      message: message,
      rating: rating,
    });
    // console.log("feedbackresponse : " + JSON.stringify(feedbackresponse));
    if (feedbackresponse?.data?.success) {
      toast.success("Thanks for your valuable feedback");
      router.push(`/profile/${userId}`);
    }
    setRating(0);
    setMessage("");
  };
  return (
    <>
      <div className="max-w-md py-3 px-3 sm:mx-auto">
        <div className="flex flex-col rounded-xl bg-slate-200 shadow-lg">
          <div className="px-12 py-5">
            <h2 className="whitespace-nowrap text-center font-semibold text-gray-800 sm:text-xl">
              Your opinion matters to us!
            </h2>
          </div>
          <div className="flex w-full flex-col items-center bg-[#fdfeff]">
            <div className="flex flex-col items-center space-y-3 py-6">
              <span className="text-lg font-medium text-gray-500">
                How was your experience?
              </span>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <svg
                    key={rate}
                    className={`h-8 w-8 cursor-pointer ${
                      rating >= rate ? "text-amber-300/70" : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => handleRatingClick(rate)}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="flex w-3/4 flex-col">
              <textarea
                rows="3"
                className="resize-none rounded-xl bg-gray-100 p-4 text-gray-500 outline-none focus:ring"
                placeholder="Leave a message, if you want"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button
                className="my-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 py-3 text-base text-white"
                onClick={handleSubmit}
              >
                Rate now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedBack;
