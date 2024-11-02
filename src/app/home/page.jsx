"use client";
import FAQ from "@/component/FAQ";
import Footer from "@/component/Footer";
import HowToProceed from "@/component/HowToProceed";
import Testimonials from "@/component/Testimonials";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";

const jobDescriptions = [
  { id: 1, title: "Business Analyst" },
  { id: 2, title: "Product Manager" },
  { id: 3, title: "Software Engineer" },
  { id: 4, title: "Marketing Specialist" },
  { id: 5, title: "Customer Service Representative" },
];

function HomePage() {
  const { token } = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.user);
  const router = useRouter();

  function handleGetStarted() {
    if (token && userId) {
      router.push(`/dashboard/profile/${userId}`);
    } else {
      router.push("/login");
    }
  }
  return (
    <>
      <div className="p-4 flex flex-col bg-[rgb(255,255,255)] ">
        <div className="p-4 mt-10 flex flex-col items-center justify-center gap-7">
          <h1 className="text-center text-4xl font-bold text-zinc-800">
            Your Personal Interview Mentor
          </h1>

          <p className="text-xl font-semibold text-gray-600">
            Get ready to ace your next interview with our AI-Powered Interview
            Prep.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 mt-5 bg-gradient-to-r from-blue-400 via-teal-500 to-purple-600 rounded-l-full rounded-r-full hover:scale-105 transition ease-out duration-300 "
          >
            <span className="ml-2 text-zinc-200 space-x-4 flex flex-row">
              Get Started{" "}
              <FaArrowRightLong className="mt-[0.2rem] ml-[0.5rem]" />
            </span>
          </button>
        </div>
        {/* Hero Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-7">
          {/* left part of hero section */}
          <div className="flex flex-col p-4 mt-4 w-[90%]">
            <div className="text-base text-green-400 mt-4">
              <span className="bg-green-100 border border-gray-200 rounded-md p-2 inline-block">
                AI-Powered Interview
              </span>
              <div className="flex w-full items-start gap-4 mt-5">
                {/* Overlap images and stars */}
                <div className="flex items-center gap-2">
                  {/* Overlap images */}
                  <div className="flex -space-x-4 overflow-hidden">
                    <div className="rounded-full border-2 border-white w-10 h-10 transform transition-transform duration-200 hover:scale-125">
                      <img
                        src="https://storage.googleapis.com/assets-aiapply/monika-profile-pic.jpg"
                        alt="ai for jobs"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="rounded-full border-2 border-white w-10 h-10 transform transition-transform duration-200 hover:scale-125">
                      <img
                        src="https://storage.googleapis.com/assets-aiapply/woman-social-proof.webp"
                        alt="resume builder ai"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="rounded-full border-2 border-white w-10 h-10 transform transition-transform duration-200 hover:scale-125">
                      <img
                        src="https://storage.googleapis.com/assets-aiapply/woman-social-proof2.webp"
                        alt="how to build a resume ai"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="rounded-full border-2 border-white w-10 h-10 transform transition-transform duration-200 hover:scale-125">
                      <img
                        src="https://storage.googleapis.com/assets-aiapply/man-social-proof.webp"
                        alt="ai for jobs"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  {/* stars besides overlap */}
                  <div className="flex flex-col gap-1">
                    <div className="text-orange-400">★★★★★</div>
                    <div className="text-xs text-base-content/50">
                      Loved by <span>325,114</span> users{" "}
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
            <div className="p-5 my-5 w-[75%] space-y-7">
              <p className="font-bold text-2xl text-gray-800 mt-5">
                Boost your confidence,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  ace the job interview.
                </span>
              </p>
              <p className="font-semibold text-lg text-zinc-600">
                Practice your domain related interview. Get feedback and
                suggesstion to improve your performance
              </p>
            </div>
          </div>
          {/* Right part of hero section */}
          <div className="p-4 bg-[hsla(0,0%,100%,1)] shadow-md border-1 border-gray-200 rounded-lg mt-10 flex flex-col">
            <span className="text-lg text-gray-800">
              Turn a job description into interview questions to practice with
            </span>

            <div className="flex flex-row space-x-2 flex-wrap">
              {jobDescriptions.map((data, index) => (
                <div key={index} className=" p-4">
                  <div className="px-4 py-1 text-zinc-700 rounded-l-full rounded-r-full bg-gray-400 cursor-pointer hover:bg-teal-200 hover:text-zinc-900 hover:scale-110 transition ease-out duration-300 ">
                    {data.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-[25rem] p-5 m-7 runded-lg border-1 border-gray-200">
              <img
                src="./hero_1.jpg"
                alt="image"
                loading="lazy"
                className="object-cover items-center h-full w-full border-1 border-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>
        {/* Testimonials */}
        <div className="flex items-center justify-center m-7 p-5">
          <Testimonials />
        </div>
        {/* How To Proceed */}
        <div className="flex items-center justify-center m-7 p-5">
          <HowToProceed />
        </div>
        {/* Faq */}
        <div className="flex items-center justify-center m-7 p-5">
          <FAQ />
        </div>
      </div>
      {/* Footer */}

      <div className=" p-5 bg-slate-800">
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
