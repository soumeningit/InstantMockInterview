"use client";

import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function ShowAnswer() {
  const { interviewAnswer } = useSelector((state) => state.questionsandanswers); // Uncomment if using Redux

  const [dataId, setDataId] = useState(null);
  const [show, setShow] = useState(false);

  const handleButtonClick = (index) => {
    if (dataId === index) {
      setShow(!show); // Toggle visibility if the same question is clicked
    } else {
      setDataId(index); // Set new question and ensure answer is shown
      setShow(true);
    }
  };

  return (
    <div className="flex items-center justify-center p-5 m-5 gap-7">
      <div className="grid grid-cols-2 m-3 p-4">
        <div className="p-4 m-2 w-full flex flex-col">
          <div className="p-2 ml-[0.4rem]">
            <h2 className="text-2xl font-bold text-[#2b2727af] ">
              Detailed Analysis Of Every Question{" "}
            </h2>
          </div>
          <div className="flex flex-row flex-wrap p-2 m-1">
            {interviewAnswer &&
              interviewAnswer?.answers?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className="px-2 py-1 m-2 cursor-pointer rounded-l-full rounded-r-full border border-gray-300 shadow-md bg-[#d6d0d0c7] hover:scale-105 hover:shadow-md hover:shadow-emerald-200 transition ease-out duration-300 text-gray-400 hover:text-gray-700"
                >
                  {`Question ${index + 1}`}
                </button>
              ))}
          </div>
          <div className="flex flex-col p-4 my-5 items-center">
            {show && dataId !== null && (
              <div className="flex flex-col p-2 my-2">
                <p className="text-base text-gray-800 p-2 my-4">
                  <span className="text-base text-semibold text-pretty text-zinc-900">
                    Question
                  </span>{" "}
                  : {interviewAnswer.answers[dataId].question}
                </p>
                <p className="text-base text-gray-800 p-2 my-4">
                  <span className="text-base text-semibold text-pretty text-zinc-900">
                    Analysis
                  </span>{" "}
                  : {interviewAnswer.answers[dataId].message}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 m-2 w-full flex flex-col">
          <div className="p-2 ml-[0.4rem]">
            <h2 className="text-2xl font-bold text-[#2b2727af] ">
              Overall Grade{" "}
            </h2>
          </div>
          <div className="flex flex-col p-5 my-6 space-y-4">
            <h2 className="text-2xl text-gray-800 my-4">
              <span className="text-2xl text-semibold text-pretty text-zinc-900">
                Interview Marks : {interviewAnswer?.overallRating} out of 10
              </span>
            </h2>
            <p>
              <span className="text-base text-semibold text-pretty text-zinc-900">
                Analysis : {interviewAnswer?.message}
              </span>
            </p>
            <p>
              <span className="text-base text-semibold text-pretty text-zinc-900">
                Recommendation : {interviewAnswer?.suggestion}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAnswer;
