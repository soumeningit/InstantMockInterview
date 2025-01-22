"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ProfilePage({ params }) {
  const router = useRouter();
  // console.log("params in profile page : " + JSON.stringify(params));
  const [allInterviews, setAllInterViews] = useState(null);

  const userId = params.id;
  // const userId = useSelector((state) => state.auth.user);

  // console.log("userId in profile page : " + userId);

  useEffect(() => {
    const getAllInterview = async () => {
      try {
        const response = await axios.post("/api/users/getAllInterviews", {
          userId,
        });
        // console.log("all mock interviews : ", JSON.stringify(response));
        setAllInterViews(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllInterview();
  }, []);

  async function createNewInterView() {
    // Add functionality for creating a new interview here
    router.push(`/dashboard/interviewModal/${params?.id}`);
    // toast.success("New mock interview created!");
  }

  function restartButtonHandle(id) {
    console.log("Restart button clicked....");
    console.log(id);
    router.push(`/dashboard/interview/${id}`);
  }

  function feedbackButtonHandled(id) {
    console.log("Feedback button clicked....");
    // console.log(id);
    router.push(`/dashboard/feedback/${id}`);
  }

  return (
    // <div className="flex flex-col p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
    //   <h1 className="text-2xl font-bold text-teal-500 mb-4">Dashboard</h1>

    //   <div className="flex flex-col space-y-2 mb-6 cursor-pointer">
    //     <p className="text-base text-gray-700 text-pretty mb-2">
    //       Create and start your AI mock Interview
    //     </p>
    //     <div
    //       onClick={createNewInterView}
    //       className="h-[4rem] w-full max-w-[11rem] bg-slate-200 border border-gray-300 rounded-md flex items-center justify-center shadow-md transition-transform transform hover:scale-105"
    //     >
    //       <button className="text-sm text-teal-500 font-semibold">
    //         + Add New
    //       </button>
    //     </div>
    //   </div>

    //   <h2 className="text-xl font-semibold text-gray-800 mb-4">
    //     Previous Mock Interviews
    //   </h2>
    //   {allInterviews?.length > 0 ? (
    //     <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5">
    //       {allInterviews &&
    //         allInterviews.map((data) => {
    //           return (
    //             <div
    //               key={data?._id}
    //               className="bg-white border border-gray-300 rounded-md p-4 shadow-sm h-[8rem] flex flex-col justify-between w-64" // Set fixed height here
    //             >
    //               <div>
    //                 <p className="text-lg text-blue-700 font-semibold">
    //                   {data.role}
    //                 </p>
    //                 <p className="text-sm text-gray-600">
    //                   Experience: {data.experience} years
    //                 </p>
    //                 <p className="text-xs text-gray-500">
    //                   Created at:{" "}
    //                   {new Date(data.interviewDate).toLocaleDateString()}
    //                 </p>
    //               </div>
    //               <div className="flex flex-row justify-between mt-2">
    //                 <button
    //                   onClick={(event) => {
    //                     event.preventDefault();
    //                     feedbackButtonHandled(data._id);
    //                   }}
    //                   className="mt-2 px-2 py-1 text-xs bg-teal-500 text-white rounded hover:bg-teal-400 transition duration-300"
    //                 >
    //                   Feedback
    //                 </button>
    //                 <button
    //                   key={data._id}
    //                   onClick={(event) => {
    //                     event.preventDefault();
    //                     restartButtonHandle(data._id);
    //                   }}
    //                   className="mt-2 px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-400 transition duration-300"
    //                 >
    //                   Restart
    //                 </button>
    //               </div>
    //             </div>
    //           );
    //         })}
    //     </div>
    //   ) : (
    //     <div className="text-center text-gray-500 text-lg">
    //       No previous interviews found
    //     </div>
    //   )}
    // </div>
    <div className="flex flex-col p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-teal-500 mb-4">Dashboard</h1>

      <div className="flex flex-col space-y-2 mb-6 cursor-pointer">
        <p className="text-base text-gray-700 mb-2">
          Create and start your AI mock Interview
        </p>
        <div
          onClick={createNewInterView}
          className="h-[4rem] w-full max-w-[11rem] bg-slate-200 border border-gray-300 rounded-md flex items-center justify-center shadow-md transition-transform transform hover:scale-105"
        >
          <button className="text-sm text-teal-500 font-semibold">
            + Add New
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Previous Mock Interviews
      </h2>

      {allInterviews?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {allInterviews?.map((data) => (
            <div
              key={data?._id}
              className="bg-white border border-gray-300 rounded-md p-4 shadow-sm h-[8rem] flex flex-col justify-between w-full"
            >
              <div>
                <p className="text-lg text-blue-700 font-semibold">
                  {data.role}
                </p>
                <p className="text-sm text-gray-600">
                  Experience: {data.experience} years
                </p>
                <p className="text-xs text-gray-500">
                  Created at:{" "}
                  {new Date(data.interviewDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-row justify-between mt-2">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    feedbackButtonHandled(data._id);
                  }}
                  className="mt-2 px-2 py-1 text-xs bg-teal-500 text-white rounded hover:bg-teal-400 transition duration-300"
                >
                  Feedback
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    restartButtonHandle(data._id);
                  }}
                  className="mt-2 px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-400 transition duration-300"
                >
                  Restart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No previous interviews found
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
