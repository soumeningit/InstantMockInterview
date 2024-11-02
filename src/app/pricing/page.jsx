"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const freeDivData = [
  {
    id: 1,
    key: "RATE LIMITS",
    value: "100 per day",
  },
  {
    id: 2,
    key: "PRICING",
    value: "Free",
  },
  {
    id: 3,
    key: "Analysis",
    value: "Not Available",
  },
  {
    id: 4,
    key: "SUPPORT",
    value: "Not Available",
  },
];

const paidDivData = [
  {
    id: 1,
    key: "RATE LIMITS",
    value: "100000 per day",
  },
  {
    id: 2,
    key: "PRICING",
    value: "$40 / mo",
  },
  {
    id: 3,
    key: "Analysis",
    value: "Available",
  },
  {
    id: 4,
    key: "SUPPORT",
    value: "Available",
  },
];

function PricingPage() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const handleBuyNow = async () => {
    try {
      toast.loading("Loading...");
      const response = await axios.post("/api/users/initiatepayment", {
        userId: user,
      });
      toast.remove();
      console.log("payment response : " + JSON.stringify(response));
      if (response?.data?.success) {
        const redirectUrl = response.data.redirectUrl;
        router.push(redirectUrl); // Perform the redirect here
      } else {
        console.error(response.data.message);
      }
      toast.remove();
    } catch (error) {
      console.log("Payment error : " + error);
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-950 h-screen">
      <h1 className="text-2xl font-bold text-start text-zinc-300">Pricing</h1>
      <div className="grid grid-cols-2">
        {/* left side div */}
        <div className="w-[90%] flex flex-col items-start justify-center border-2 border-teal-400 shadow:md rounded-lg p-14 m-7">
          <h2 className="text-2xl font-bold text-zinc-300">
            Free of Charge{" "}
            <span className="text-xl font-bold text-white">
              <sup>*</sup>
            </span>
          </h2>
          <p className="my-2 text-base text-zinc-400">
            Free Tier provides a limited no of services
          </p>
          <hr className="text-white shadow-md h-0.5 w-full" />

          {freeDivData.map((item, index) => {
            return (
              <div className="grid grid-cols-2 w-[90%] mt-4" key={item.id}>
                <div className="h-16">
                  <p className="text-base text-zinc-500">
                    {item.key}{" "}
                    {item.id === 1 ? (
                      <span className="text-xl font-bold text-zinc-300">
                        <sup>**</sup>
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="h-16">
                  <p className="text-base text-zinc-500">{item.value}</p>
                </div>
              </div>
              // <hr className="text-white shadow-md h-0.5 w-full" />
            );
          })}
          {/* <div className="grid grid-cols-2 w-[90%] mt-4">
            <div className="h-10">
              <p className="text-base text-zinc-500">Rate limits</p>
            </div>
            <div className="h-10">
              <p className="text-base text-zinc-500">100 requests per day</p>
            </div>
          </div>
          <hr className="text-white shadow-md h-0.5 w-full" /> */}
          <button
            onClick={handleBuyNow}
            className="rounded-l-full rounded-r-full bg-gradient-to-l from-blue-600 to-blue-400 shadow-sm hover:shadow-md border-1 border-gray-100 hover:border-gray-200 transition ease-out duration-300 scale-90 hover:scale-105 text-base text-white hover:text-zinc-200 px-4 py-2 mt-10"
          >
            Upgrade
          </button>
        </div>

        {/* right side div */}
        <div className="w-[90%] flex flex-col items-start justify-center border-2 border-teal-400 shadow:md rounded-lg p-14 m-7">
          <h2 className="text-2xl font-bold text-zinc-300">
            Paid{" "}
            <span className="text-xl font-bold text-white">
              <sup>*</sup>
            </span>
          </h2>
          <p className="my-2 text-base text-zinc-400">
            Provides detailed analysis, Support from team if required
          </p>
          <hr className="text-white shadow-md h-0.5 w-full" />

          {paidDivData.map((item, index) => {
            return (
              <div className="grid grid-cols-2 w-[90%] mt-4" key={item.id}>
                <div className="h-16">
                  <p className="text-base text-zinc-500">
                    {item.key}{" "}
                    {item.id === 1 ? (
                      <span className="text-xl font-bold text-zinc-300">
                        <sup>**</sup>
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="h-16">
                  <p className="text-base text-zinc-500">{item.value}</p>
                </div>
              </div>
              // <hr className="text-white shadow-md h-0.5 w-full" />
            );
          })}
          <button
            onClick={handleBuyNow}
            className="rounded-l-full rounded-r-full bg-gradient-to-l from-blue-600 to-blue-400 shadow-sm hover:shadow-md border-1 border-gray-100 hover:border-gray-200 transition ease-out duration-300 scale-90 hover:scale-105 text-base text-white hover:text-zinc-200 px-4 py-2 mt-10"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
