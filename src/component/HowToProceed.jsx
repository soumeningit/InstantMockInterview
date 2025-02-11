"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const steps = [
  {
    title: "Step 1",
    description:
      "First create an account, if you have already an account, log in first",
  },
  {
    title: "Step 2",
    description:
      "Now you get an option to create a new interview or restart any previous interview",
  },
  {
    title: "Step 3",
    description:
      "If you choose a previous interview, you are ready to take an interview. If you choose a new one, it asks for some information, and you're ready to go.",
  },
  {
    title: "Step 4",
    description:
      "It checks your system mic; if blocked, it needs to access the mic to check your voice.",
  },
  {
    title: "Step 5",
    description:
      "After completing the interview, you will get a score and feedback about your performance.",
  },
];

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 md:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-xl md:text-2xl lg:text-3xl text-gray-500 hover:text-gray-700 z-10 mr-4"
  >
    ◀
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 md:right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-xl md:text-2xl lg:text-3xl text-gray-500 hover:text-gray-700 ml-10"
  >
    ▶
  </button>
);

function HowToProceed() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center space-x-2 mt-4">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-500"></div>
    ),
  };

  return (
    <>
      <div className="max-w-lg md:max-w-xl lg:max-w-3xl mx-auto mt-10 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 md:mb-6 text-gray-800">
          How To Proceed
        </h2>
        <p className="text-base md:text-lg text-zinc-600 text-center">
          Here is a quick guide on how you can attend this interview.
        </p>
        <Slider {...settings} className="mt-6 ml-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-4 sm:px-6 sm:py-8 bg-white shadow-md rounded-lg ml-10 mr-10 max-w-2xl"
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 text-blue-900">
                {step.title}
              </h3>
              <p className="text-gray-900 text-sm md:text-base w-full">
                {step.description}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default HowToProceed;
